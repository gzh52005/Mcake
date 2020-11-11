import React,{useState,useMemo,useEffect} from 'react'
import request from '../utils/request'


import '../css/Cart.scss'; 


function Cart(props){
    //设置已买商品状态
    const [goods,changeGoods] = useState([])
    //设置推荐列表状态
    const [recommendList,changeList] = useState([])
    //设置是否拥有商品的状态
    const [haveGoods,changeHave] = useState(false)
    //改变推荐列表的数据
    const getRecommend = useEffect(function(){
        if(!haveGoods){
                request('/cakelist',{pageSize:10}).then((data)=>{
                   changeList(data.data)
                })
        }
    },[haveGoods])


    //渲染推荐数据

    const recommendRender = useMemo(function(){
        console.log('recommendList变了',recommendList);
        if(!haveGoods){
            console.log('歪');
            const recommend = recommendList.map(good=>{
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
            return recommend
        }
    },[recommendList])

    //渲染结构（有数据/无数据）
    const result = useMemo(function(){
        if(goods.length){
            return <div>111</div>
        }else{
            //没有东西的时候加载这里
            changeHave(false)
            console.log(recommendList,'recommendList');
            return (
            <div className="no-cart-box">
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
                            recommendRender
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
            )
        }
    },[recommendList,haveGoods])

    return (
        <div className="cart-box">
            {
                result
            }
        </div>
    )
}


export default Cart;