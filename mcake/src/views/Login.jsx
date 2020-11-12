import {useState,useCallback} from 'react'
import {withRouter} from 'react-router-dom'
import '../css/Login.scss'
import phone from '../assets/images/Login/phone.png'
import suo from '../assets/images/Login/suo.png'
import zhifubao from '../assets/images/Login/zhifubao.png'
import weibo from '../assets/images/Login/weibo.png'
import request from '../utils/request'
export default function Login(props){
    let [username,changeusername]=useState('')
    let [password,changepassword]=useState('')
    let [jieguo,changejieguo]=useState(false)
    let fn1=useCallback(async function(){
            let p= await request.get('/users/login',{
                username,
                password
            })
            if(p.code===3000){
                changejieguo(!jieguo)
            }else if(p.code===2000){
                
                p.username=username
                localStorage.setItem('currentUser',JSON.stringify(p))
                props.history.push('/mine')
            }

    })
    let goto=useCallback(function(){
              props.history.push('/reg?/login')
    },[])
    
    return(
        <div className='login-box'>
            {jieguo?<div className='login-tishi'>
                <div>
                    <h4>提示</h4>
                    <span>登录账号或密码错误，请修改后重试</span>
                    <p onClick={()=>{changejieguo(!jieguo)}}>确定</p>
                </div>
            </div>:''}
            
            {/* <p className='login-tishi'><span>用户名或密码错误</span></p> */}
            <h2>账号密码登录</h2>
            <p className='login-shu'>
                <img src={phone}></img>
                <input value={username}  onChange={(e)=>{changeusername(e.currentTarget.value)}} type="text" placeholder="用户名/手机号码" />
            </p>
            <p className='login-shu'>
                <img src={suo}></img>
                <input type="password" placeholder="密码" onChange={(e)=>{changepassword(e.currentTarget.value)}}/>
            </p>
            <span onClick={goto}>立即注册</span>
            <span>其他登陆方式</span>
            
            <p>
                <img src={zhifubao}></img>
                <img src={weibo}></img>
            </p>
            <button onClick={fn1}>立即登录</button>
        </div>
    )
}
Login=withRouter(Login)