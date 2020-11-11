import React,{useState,useMemo} from 'react'
import request from '../utils/request'


import '../css/Cart.scss'; 


function Cart(props){
    const [goods,changeGoods] = useState([])
    console.log(goods);
    const [recommendList,changeList] = useState([])
    const getRecommend = useMemo(function(){
        if(!goods.length){
            console.log(1);
            const res = request('/cakelist')
            res.then(data=>{
                console.log(2);
                changeList(data.data)
            })
        }
    },[goods])
    const result = useMemo(function(){
        if(goods.length){
            console.log(1);
            return <div>111</div>
        }else{
            //没有东西的时候加载这里
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
                            recommendList.map(good=>{
                                return <li className="recommend_item">
                            <div className="recommend_item_box">
                                <img/>

                            </div>
                        </li>
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
            )
        }
    },[recommendList])

    return (
        <div className="cart-box">
            {
                result
            }
        </div>
    )
}


export default Cart;