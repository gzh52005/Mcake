import React,{useState,useCallback,useEffect, useRef} from 'react';

import '../../css/home.scss';
import Pop from '../common/popLogin'
import request from '../../utils/request'
import Sadd from '../common/succeedAdd'
import { withRouter } from 'react-router-dom';
function CartMask(props){
    const [qty,changeQty] = useState(1);
    const [weight,changeWeight] = useState(false);
    const [btn,changeBtn] = useState(false)
    const [addHide,changeHide]=useState(false)
    // console.log('props=',props);
    // 选择重量
    let {showCart,showData,changeShow,changeData} = props;
    let eatNum = showData.list.filter(item=>(
        item.weight === showData.weight
    ))[0];
    // 默认显示重量
    let moren=`${eatNum.spec} (${eatNum.weight}) -${eatNum.edible}`;
    // console.log("showData.list=",showData.list);
    // console.log("eatNum=",eatNum.weight);
    
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

    const myel = useRef(null);
    // console.log("myel=",myel.current);
    // console.log("cartMask.props=",showCart,showData);
    // const [showMe,setShow] = useState(showCart);
    useEffect(function(){
        // console.log(showCart,myel,999);
        if(showCart){
            myel.current.style.top = "200px";
        }
    },[showCart])
    // useCallback(function(){
    //     if(showCart){
    //         myel.current.style.top = "200px";
    //     }
    // })

    // setShow()
    return (
       <div className="cartMask" onClick={(e)=>{
           let clickName = e.target.className
           if(clickName=="cartMask"||clickName=="closeBtn"||clickName=="cancel"){
            changeShow(false);
           }
            }}>
            <div className="maskCon" ref={myel}>
                <ul>
                    <li className="contentDesc">
                        <img src={showData.img} alt=""/>
                        <div className="disc">
                            <h5>{showData.name}</h5>
                            <p>{showData.french}</p>
                            <h5>￥{showData.list[currentIdx].pprice}</h5>
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
                                            {item.spec}（{item.weight}）  - {item.edible}
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
                            <input type="button" value="-" onClick={()=>{if(qty>1)changeQty(qty-1)}}/>
                            <input type="text" id="" value={qty} onChange={changeInput.bind(null)}/>
                            <input type="button" value="+" onClick={()=>{
                                changeQty(qty+1)
                            }}/>
                        </div>
                        
                    </li>
                </ul>
                <div className="sureButton">
                    <button className="cancel">取消</button>
                    <button onClick={()=>{
                        const userData = JSON.parse(localStorage.getItem('currentUser'))
                        if(userData){
                            let bcname ='';
                            if(showData.bcname=='蛋糕'){
                                 bcname = 'cake'
                            }else if(showData.bcname=='商品配件'){
                                bcname='parts'
                            }else if(showData.bcname=='周边商品'){
                                bcname='snack'
                            }
                            // console.log(bcname);
                            // console.log(userData);
                            // console.log(userData.username);
                            // console.log(showData.id);
                            // console.log(showData.list[currentIdx].id);
                            // console.log(qty);
                            // console.log(bcname);
                            request.put('/cart/push/'+userData.username,{id:showData.id,checkid:showData.list[currentIdx].id,num:qty,bcname:bcname})
                            .then((reg)=>{
                                changeHide(true)
                                    setTimeout(() => {
                                    changeShow(false);
                                }, 300);
                                // console.log(props);
                                if(props.location.pathname==='/cart'){
                                    request('/cart/usergoods',{username:props.username}).then((data)=>{
                                        // console.log('user',username,data);
                                        if(data.data.length){
                                            // console.log(data.data,'用户商品');
                                        // console.log(data.data[0].goods,'用户商品数据');
                                        let arr =data.data[0].goods
                                        let checklist = []
                                        for(let i=0;i<arr.length;i++){
                                            checklist.push(false)
                                        }
                                        props.changeCheckLists(checklist)
                                        props.changeGoods(arr)
                                        props.changePick(false)
                                        }
                                     })
                                    // console.log('页面刷新');
                                }
                                // console.log(props,"props");
                            })
                        }else{
                            changeBtn(true)
                        }
                    }}>确认</button>
                </div>
            </div>
           {btn? <Pop btn={btn} changeBtn={changeBtn} />:''}
         {  addHide? <Sadd /> : ''}
        </div>
    )
    
}

export default withRouter(CartMask);