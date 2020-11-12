import React from 'react';

import '../../css/home.scss';

class CartMask extends React.Component{
    changeQty = ()=>{
        console.log(1);
    }
    render(){
        return (
            <div className="cartMask">
                <div className="maskCon">
                    <ul>
                        <li className="contentDesc">
                            <img src="https://static.mcake.com/goods/huayangnianhua/R0329/small/1.jpg" alt=""/>
                            <div className="disc">
                                <h5>花漾年华</h5>
                                <p>Floraison</p>
                                <h5>￥298.00</h5>
                            </div>
                            <span className="closeBtn">✕</span>
                        </li>
                        <li className="specification choose">
                            <h4>规格选择</h4>
                            <div className="chooseSpecify">
                                <span>1磅（454g）  - 2-3人食
                                ∨
                                </span>
                            </div>
                        </li>
                        <li className="number choose">
                            <h4>数量选择</h4>
                            <div className="chooseQty">
                                <input type="button" value="-"/>
                                <input type="text" id="" value="1" onChange={this.changeQty}/>
                                <input type="button" value="+"/>
                            </div>
                            
                        </li>
                    </ul>
                    <div className="sureButton">
                        <button>取消</button>
                        <button>确认</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartMask;