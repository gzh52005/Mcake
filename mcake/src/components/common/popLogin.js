import React,{Component, useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
function Pop(props) {
    console.log(props);
    const {btn,changeBtn,history} = props
    const myEl = useRef(null)
    useEffect(function(){
    myEl.current.style.width = 80+'%'    
    myEl.current.style.opacity = 1   
    })
    return ( 
            <div className='mask' onClick={
                (e)=>{
                    console.log(e.target.className);
                    if(e.target.className=="mask"||e.target.className=='btn1'){
                       console.log(111111111111);
                        changeBtn(false)
                    }
                }
            }>
                <div className='pop' ref={myEl}>
                    <div className='pop-header'>
                        <div className='pop-title'>温馨提示</div>
                    </div>
                    <div className='pop-content'>
                        <div className='pop-msg'>您需要先登录才能继续您的操作</div>
                    </div>
                    <div className='pop-btnAll'>
                        <button className='btn1' >以后再说</button>
                         <button className='btn2'   onClick={()=>{history.push('login')}} >立即登录</button>
                       
                    </div>
                </div>
            </div>
         );
    }
export default     withRouter(Pop);