import React,{useState,useCallback}from 'react';
import '../../css/home.scss';
import titleImg from '../../assets/images/Home/icon_cj.png';
import cartIcon from '../../assets/images/cart-icon.png';
import {withRouter} from 'react-router-dom'
import CartMask from '../../components/Home/CartMask';

function Floor(props){
    // console.log("props=",props);
    const [showCart,changeShow] = useState(false);
    const [showData,changeData] = useState([]);
    console.log("goods=",props.data);
    const cartShow = useCallback(function(goods){
        
        changeShow(!showCart);
        // console.log("cartshow=",cartshow);
        changeData(goods);
    },[showData]);
    let chuan=useCallback(function(type,id){
        if(type=='周边商品'){
            props.history.push('/details?'+'snack'+'&'+id)
        }else if(type=='蛋糕'){
            props.history.push('/details?'+'cake'+'&'+id)
        }
    },[])
    return (
        <div>
            {
                props.data.map(item=>(
                    <div className="floor" key={item.id}>
                        <div className="title">
                            <img src={titleImg} alt=""/>
                            <div className="titleCon">
                                <p className="cname">{item.title}</p>
                                <p className="ename">{item.info}</p>
                            </div>
                            <div className="titleAlias">
                                {item.alias}
                            </div>
                        </div>
                        <div className="bigImg">
                            <img src={item.source.adsense[0].img} alt=""/>
                        </div>
                        <ul className="floorCon">
                            {
                                item.source.goods.map(goods=>(
                                    <li className="conProduct" key={goods.id}>
                                        <div className="conImg" onClick={chuan.bind(null,goods.bcname,goods.id)}><img src={goods.img} alt=""/></div>
                                        <b>{goods.name}</b>
                                        <p>{goods.french}</p>
                                        <span>￥{goods.price}</span>
                                        <i className="cartIcon" onClick={cartShow.bind(null,goods)}>
                                            <img src={cartIcon} alt=""/>
                                        </i>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
            {
                showCart?<CartMask showCart={showCart} changeShow={changeShow} showData={showData}/>:''
            }
        </div>
        
        
    )
}
Floor=withRouter(Floor)
export default Floor;