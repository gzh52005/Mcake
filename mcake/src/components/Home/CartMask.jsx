import React,{useState,useCallback} from 'react';

import '../../css/home.scss';

function CartMask(props){
    const [qty,changeQty] = useState(1);
    const [weight,changeWeight] = useState(false);
    
    // 选择重量
    let {showCart,showData,changeShow} = props;
    let eatNum = showData.list.filter(item=>(
        item.weight === showData.weight
    ))[0];
    // 默认显示重量
    let moren=`${eatNum.spec} (${eatNum.weight}) -${eatNum.edible}`;
    console.log("showData.list=",showData.list);
    console.log("eatNum=",eatNum.weight);
    
    // 默认重量下标
    let xiabiao;
    showData.list.forEach((item,index)=>{
        if(item.weight === eatNum.weight){
            xiabiao = index;
        }
    })
    const [guige,changeGuige]=useState(moren);
    const [currentIdx,changeIdx] = useState(xiabiao);

    let fn1=useCallback(function(newguige,index){
        changeGuige(`${newguige.spec} (${newguige.weight}) -${newguige.edible}`);
        changeIdx(index);
        changeWeight(!weight);

    })

    const changeInput = useCallback((e)=>{
        // console.log(1);
        changeQty(e.currentTarget.value);
    },[qty]);

    
    console.log("cartMask.props=",showCart,showData);
    return (
       <div className="cartMask" onClick={(e)=>{
           let clickName = e.target.className
           if(clickName=="cartMask"||clickName=="closeBtn"||clickName=="cancel"){
            changeShow(false);
           }
                
            }}>
            <div className="maskCon">
                <ul>
                    <li className="contentDesc">
                        <img src={showData.img} alt=""/>
                        <div className="disc">
                            <h5>{showData.name}</h5>
                            <p>{showData.french}</p>
                            <h5>￥{showData.price}</h5>
                        </div>
                        <span className="closeBtn">✕</span>
                    </li>
                    <li className="specification choose">
                        <h4>规格选择</h4>
                        <div className="chooseSpecify">
                            <span
                            onClick={()=>{
                                changeWeight(!weight)
                            }}
                            >{guige}
                            ∨
                            </span>
                            {
                                weight?
                                (<ul className="chooseWeight">
                                {
                                    showData.list.map((item,index)=>(
                                        <li key={item.id}
                                        className={index===currentIdx?"activeWeight":''}
                                        onClick={fn1.bind(null,item,index)}
                                        >
                                            {item.spec}（{showData.weight}）  - {item.edible}
                                        </li>
                                    ))
                                }
                            </ul>):''
                            }
                        </div>
                    </li>
                    <li className="number choose">
                        <h4>数量选择</h4>
                        <div className="chooseQty">
                            <input type="button" value="-"/>
                            <input type="text" id="" value={qty} onChange={changeInput.bind(null)}/>
                            <input type="button" value="+"/>
                        </div>
                        
                    </li>
                </ul>
                <div className="sureButton">
                    <button className="cancel">取消</button>
                    <button >确认</button>
                </div>
            </div>
        </div>
    )
    
}

export default CartMask;