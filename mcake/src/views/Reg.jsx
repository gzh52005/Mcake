// import React from 'react';
import {useState,useCallback,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import '../css/Reg.scss'
import phone from '../assets/images/Login/phone.png'
import suo from '../assets/images/Login/suo.png'
import yonghu from '../assets/images/mine/wode.png'
import request from '../utils/request'

export default function Reg(props){
    let [username,changeusername]=useState('')
    let [telphone,changetelphone]=useState('')
    let [password,changepassword]=useState('')
    let [againpassword,changeagainpassword]=useState('')
    let [jieguo,changejieguo]=useState(false)
    let [gaitishi,changegaitishi]=useState('')
    let [tongyi,changetongyi]=useState(false)
    let [mimati,changemimati]=useState(false)
    let [nameti,changenameti]=useState(false)
    let reg1=/^[\da-zA-Z_]{6,14}$/
    let reg2 = /^[1]([3-9])[0-9]{9}$/
    let reg3=/^[A-Za-z\d.!%*#?]{6,18}$/
    let len = username.replace(/[\u4e00-\u9fa5]/g,"aaa")
      useEffect(function(){
          if(!username){
            changenameti(false)
          }else{
               changenameti(reg1.test(len))
          }
       
     },[username])
     useEffect(function(){
         if(password){
            changemimati(reg3.test(password))
            
         }else{
            changemimati(false)
         }
        
     },[password])
    let fn1=useCallback(async function(){
        
        
        if(!reg1.test(len)){
            changegaitishi('请输入7-14个字符的用户名（中文占三个字符）')
            
        }else if(!reg2.test(telphone)){
            changegaitishi('手机号错误')
            
        }else if(!reg3.test(password)){
            changegaitishi('请输入6-18个字符的密码')
            
        }else if(password!==againpassword){
            changegaitishi('两次输入的密码不一致')
         
        }else if(!tongyi){
            changegaitishi('请阅读并同意《MCAKE购物协议》')
           
        }else{
           let p=await request.get('/users/checkname',{
            username,
            tel:telphone
           })
           if(!p.flag){
            changegaitishi('账号已存在')
           }else{
               let q=await request.post('/users/reg',{
                   username,
                   tel:telphone,
                   password
               })
               if(q.flag){

                props.history.replace({
                    pathname:'/login',
                    state:{
                        username
                    }
                })
               return
               }else{
                changegaitishi('注册失败，请重新尝试')
               }
           }
            
           
        }
        changejieguo(true)
        setTimeout(() => {
            changejieguo(false)
        }, 3000);
    })
    return(
        <div className='reg-box'>
            <p className='reg-shu'>
                <img src={yonghu}></img>
                <input value={username}  onChange={(e)=>{changeusername(e.currentTarget.value)}} type="text" placeholder="用户名" />
            </p>
            {nameti?'':<span>请输入7-14个字符的用户名（中文占三个字符）</span>}
            
            <p className='reg-shu'>
                <img src={phone}></img>
                <input value={telphone}  onChange={(e)=>{changetelphone(e.currentTarget.value)}} type="text" placeholder="手机号码" />
            </p>
            <p className='reg-shu'>
                <img src={suo}></img>
                <input type="password"  placeholder="密码" onChange={(e)=>{changepassword(e.currentTarget.value)}}/>
            </p>
            {mimati?'':<span>请输入6-18个字符的密码</span>}
            
            <p className='reg-shu'>
                <img src={suo}></img>
                <input type="password" placeholder="密码确认" onChange={(e)=>{changeagainpassword(e.currentTarget.value)}}/>
            </p>
            <div className='reg-que'><input type='checkbox' defaultChecked={tongyi} id="xuan"/><label for='xuan' onClick={()=>{changetongyi(!tongyi)}}></label><span>同意《MCAKE购物协议》</span></div>
            <span onClick={()=>{props.history.push('/login')}}>已有账号，立即登录</span>
            <button onClick={fn1}>立即注册</button>
            {jieguo?<p className='reg-tishi'><span>{gaitishi}</span></p>:''}
            
        </div>
    )
}
Reg=withRouter(Reg)