import React,{useState,useMemo,useCallback,useEffect} from 'react'
import request from '../utils/request'


import '../css/Cart.scss'; 


function Cart(props){
    let [isback,changelogin]=useState(false)
    //设置已买商品状态
    const [goods,changeGoods] = useState([])
    //设置推荐列表状态
    const [recommendList,changeList] = useState([])
    //改变推荐列表的数据
    const getRecommend = useEffect(function(){
        if(!goods.length){
                request('/goods/cakelist',{pageSize:10}).then((data)=>{
                   changeList(data.data)
                })
        }else{
            request('/goods/partslist',{pageSize:4}).then((data)=>{
                changeList(data.data)
                console.log(data.data,"推荐列表");
             })
        }
    },[goods])
    //给商品数据添加ischeck属性
    useEffect(function(){
        goods.forEach(good=>{
            if(good.ischeck=='undefind'){
                good.ischeck = false
            }
        })
    },[goods])

    //请求购物车数据
    useMemo(async function(){
        request('/cart/usergoods',{username:'刘德'}).then((data)=>{
            console.log(data.data[0].goods,'用户商品数据');
            changeGoods(data.data[0].goods)
         })
    },[])

    
    useEffect(function(){
        if(!localStorage.getItem('currentUser')){
            changelogin(true)
        }else{
            changelogin(false)
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
                    <ul className = "cart-box-list">
                        {
                            goods.map(good=>{
                                return (
                                    <li key={good.id}>
                                        <div className="cart-item-box">
                                            <label htmlFor={"good"+good.id}><input type="checkbox" id={"good"+good.id}/></label>
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
                                            <figure className="recommend_item">
                                                <img src={good.img} alt=""/>
                                                <figcaption>
                                    <p className="recommend_item_tilte">{good.name}</p>
                                    <p className="recommend_item_price">￥{good.pprice||good.price}</p>
                                                    <span className="recommend_item_add"></span>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="cart-pay-footer">
                            <label htmlFor="total">
                            <input type="checkbox" id="total"/>
                            </label>全选
                            <span className="totalPrice">合计：￥500</span>
                            <span className="pay">去结算(2)</span>
                        </div>
                    </div>
                </div>


                :
                
                
                <div className="no-cart-box">{/*无数据时结构*/}
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
                                        <div className="recommend_item_box">
                                            <img src={good.img}/>
                                            <div className="recommend_item_figc">
                                                <div className="recommend_item_title">
                                <p className='recommend_item_name'>{good.name}</p>
                                <p className='recommend_item_french'>{good.french}</p>
                                                </div>
                                                <div className="recommend_item_buy">
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