import React,{useState,useMemo,useCallback,useEffect} from 'react'
import request from '../utils/request'
import CartMask from '../components/Home/CartMask.jsx' 

import '../css/Cart.scss'; 


function Cart(props){

    const [cartShow,changeShow]= useState(false)
    const [goodsData,changedata] = useState({})
    const [buy,changeBuy] = useState(0)
    let [isback,changelogin]=useState(false)
    //设置用户名
    const [username,changeName] = useState('')
    //设置已买商品状态
    const [goods,changeGoods] = useState([])
    //设置推荐列表状态
    const [recommendList,changeList] = useState([])
    //选择列表
    const [checklists,changeCheckLists] = useState([])
    const [allPick,changePick] = useState(false)
    //total初始值
    const [totalPrice,changeTotal] = useState([0,0])//第一位为总数，第二位为总价
    //改变推荐列表的数据
    const getRecommend = useEffect(function(){
        if(!goods.length){
                request('/goods/cakelist',{pageSize:10}).then((data)=>{
                   changeList(data.data)
                   console.log(data.data,"推荐列表");
                })
        }else{
            request('/goods/partslist',{pageSize:4}).then((data)=>{
                changeList(data.data)
                console.log(data.data,"推荐列表");
             })
        }
    },[goods])
    
    //请求购物车数据
    useMemo(async function(){
        request('/cart/usergoods',{username}).then((data)=>{
            console.log('user',username,data);
            if(data.data.length){
                console.log(data.data,'用户商品');
            console.log(data.data[0].goods,'用户商品数据');
            let arr =data.data[0].goods
            let checklist = []
            for(let i=0;i<arr.length;i++){
                checklist.push(false)
            }
            changeCheckLists(checklist)
            changeGoods(arr)
            }
         })
         console.log('请求了');
    },[username])
    //总价,总数计算
    useMemo(function(){
        let totalP = 0
        let total = 0
        goods.forEach((good,index)=>{
            if(checklists[index]){
                totalP += ((good.pprice*1) * good.num)
                total += good.num
            }
        })
        totalP= totalP.toFixed(2)
        changeTotal([total,totalP])
    },[checklists])
    
    useEffect(function(){
        if(!localStorage.getItem('currentUser')){
            changelogin(true)
        }else{
            changelogin(false)
            changeName(JSON.parse(localStorage.getItem('currentUser')).username)
        }
  },[])


    let fn1=useCallback(function(){
    props.history.push('/login?/cart')
    })


    let fn2=useCallback(function(){

        props.history.push(props.location.search.slice(1))
          
    })

    
    return (
        <div className="cart-box">
            {isback?<div className='cart-mask'>
                  <div>
                      <h4>温馨提示</h4>
                      <p className='mask-ti'>您需要先登录才能继续您的操作</p>
                      <p className='mask-an'>
                          <span onClick={fn2}>以后再说</span>
                          <span onClick={fn1}>立即登录</span>
                      </p>
                  </div>
              </div>:''}
            {
                
                //渲染结构（有数据/无数据）
                goods.length > 0 ?
                <div className="cart-box">
                     {cartShow ?<CartMask showCart={cartShow} showData={goodsData} changeShow={changeShow}/>:''}
                    <ul className = "cart-box-list">
                        {
                            goods.map((good,goodIndex)=>{
                                return (
                                    <li key={good.id}>
                                        <div className="cart-item-box">
                                            <label htmlFor={"good"+good.id}><input type="checkbox" id={"good"+good.id} checked={checklists[goodIndex]} onChange={()=>{
                                                checklists[goodIndex] = !checklists[goodIndex]
                                                changeCheckLists([...checklists])
                                                let isAllPick = checklists.every(good=>good)
                                                changePick(isAllPick)
                                            }}/></label>
                                           <img src={good.img}/>
                                           <div className="cart-item-content-box">
                                               <div className="cart-item-content-top">
                                               <div className="cart-item-content-title">
                                                    <p className="chinese">{good.name}</p>
                                                    <p className="french">{good.french}</p>
                                               </div>
                                               <div className="cart-item-content-edit"></div>
                                               </div>
                                                <div className="cart-item-content-btm">
                                                    <span className="cart-item-price">￥{good.pprice || good.price}</span>
                                                    <span className="cart-item-wight">{good.spec} ({good.weight}) x {good.num}</span>
                                                </div>
                                                
                                           </div>
                                           <div className="delete-item" onClick={()=>{
                                               goods.slice(goodIndex,1)
                                               let arr = goods.filter((good,index)=>index != goodIndex)
                                               let checkArr = checklists.filter((check,index)=>index != goodIndex)
                                               changeGoods(arr)
                                               changeCheckLists(checkArr)
                                               if(goods.length>1){
                                                   console.log(arr);
                                                request.put('/cart/delete/'+username,{goods:arr}).then(data=>{
                                                    console.log(data);
                                                })
                                                }else{
                                                    request.delete('/cart/remove',{username}).then(data=>{
                                                        console.log(data);
                                                    })
                                                }
                                           }}>删除</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                    <div className="cart-list">
                        <h2 className="recommend_goods">
                            加购配件
                        </h2>
                        <ul className="recommend_list">
                            {
                                recommendList.map(good=>{
                                    return (
                                        <li key={good.id}>
                                            <figure className="recommend_item" onClick={()=>{
                                                 props.history.push('/details?'+props.location.pathname+"&parts&"+good.id)
                                            }}>
                                                <img src={good.img} alt=""/>
                                                <figcaption>
                                    <p className="recommend_item_tilte">{good.name}</p>
                                    <p className="recommend_item_price">￥{good.pprice||good.price}</p>
                                                    <span className="recommend_item_add" onClick={
                                                        (e)=>{
                                                            e.stopPropagation()
                                                            changedata(good);
                                                            changeShow(!cartShow);
                                                        }
                                                    }></span>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                        <div className="cart-pay-footer">
                            <label htmlFor="total">
                            <input type="checkbox" id="total" checked={allPick} onChange={()=>{
                                    changePick(!allPick)
                                    console.log(allPick);
                                    let arr = new Array()
                                    for(let i = 0;i<checklists.length;i++){
                                        arr.push(!allPick)
                                    }                  
                                    changeCheckLists([...arr])
                            }}/>全选
                            </label>
                        <span className="totalPrice">合计：￥{totalPrice[1]}</span>
                        <span className="pay" onClick={()=>{
                            
                            if(!allPick){
                                //筛选出新数组
                                let arr = goods.filter((good,index)=>{
                                    return checklists[index] == false
                                })
                                let checkArr = checklists.filter(check=>check==false)
                                changeGoods(arr)
                                changeCheckLists(checkArr)
                                request.put('/cart/delete/'+username,{goods:arr}).then(data=>{
                                    console.log(data);
                                })
                                }else{
                                    changeGoods([])
                                changeCheckLists([])
                                    request.delete('/cart/remove',{username}).then(data=>{
                                        console.log(data);
                                    })
                                }
                            
                        }}>去结算({totalPrice[0]})</span>
                        </div>
                    </div>
                   
                </div>


                :
                
                
                <div className="no-cart-box">{/*无数据时结构*/}
                {cartShow ?<CartMask showCart={cartShow} showData={goodsData} changeShow={changeShow}/>:''}
                <div className="no-cart-box-pic">
                    <p>
                        <span>您的购物车还是空的，</span>
                        <span className="tohome"
                        onClick={()=>{
                            props.history.push('/home')
                        }}
                        >赶紧行动吧！</span>
                    </p>
                </div>
                <div className="no-cart-list">
                    <h2 className="recommend_goods">
                        为您推荐
                    </h2>
                    <ul className="recommend_list">
                        {
                            recommendList.map(good=>{
                                return (
                                <li key={good.id} className="recommend_item">
                                        <div className="recommend_item_box" onClick={
                                            ()=>{

                                                    props.history.push('/details?'+props.location.pathname+"&cake&"+good.id)
                                            }
                                        }>
                                            <img src={good.img}/>
                                            <div className="recommend_item_figc">
                                                <div className="recommend_item_title">
                                <p className='recommend_item_name'>{good.name}</p>
                                <p className='recommend_item_french'>{good.french}</p>
                                                </div>
                                                <div className="recommend_item_buy" onClick={(e)=>{
                                                            e.stopPropagation()
                                                            changedata(good);
                                                            changeShow(!cartShow);
                                                        }}>
                                                </div>
                                            </div>
                                            <div className="recommend_item_price">
                                                <b>￥</b>{good.price||good.pprice}
                                            </div>
                                        </div>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="cart-footer">
                    <div className="gotohome"
                    onClick={()=>{
                        props.history.push('/home')
                    }}
                    >再逛逛</div>
                </div>
            </div>
            }
        </div>
    )
}


export default Cart;