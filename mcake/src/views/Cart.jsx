import React,{useState,useMemo,useEffect} from 'react'
import request from '../utils/request'


import '../css/Cart.scss'; 


function Cart(props){
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
        }
    },[goods])


    return (
        <div className="cart-box">
            {
                
                //渲染结构（有数据/无数据）
                goods.length > 0 ?
                <div>111</div>
                :<div className="no-cart-box">{/*无数据时结构*/}
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