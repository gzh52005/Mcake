import React,{useState,useMemo} from 'react'



import '../css/Cart.scss'; 


function Cart(props){
    const [goods,changeGoods] = useState([])
    console.log(goods);

    const result = useMemo(function(){
        if(goods.length){
            console.log(1);
            return <div>111</div>
        }else{
            //没有东西的时候加载这里
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
                </div>
            </div>
            )
        }
    },[goods])

    return (
        <div className="cart-box">
            {
                result
            }
        </div>
    )
}


export default Cart;