import {useState,useCallback} from 'react'
import {withRouter} from 'react-router-dom'
import '../css/Mine.scss'
import qiehuan from '../assets/images/mine/qiehuan.png'
import dingdan from '../assets/images/mine/dingdan.png'
import fukuan from '../assets/images/mine/fukuan.png'
import daishou from '../assets/images/mine/daishou.png'
import huiyuan from '../assets/images/mine/huiyuan.png'
import jifen from '../assets/images/mine/jifen.png'
import yue from '../assets/images/mine/yue.png'
import hongbao from '../assets/images/mine/hongbao.png'
import ka from '../assets/images/mine/ka.png'
export default function Mine(props){
    console.log(props)
    let [isback,changelogin]=useState(false)
    let fn1=useCallback(function(){
        changelogin(!isback)
        props.history.push('/login')
        })
    return (
        <div className='mine-box'>
             {isback?<div className='mine-mask'>
                  <div>
                      <h4>提示信息</h4>
                      <p className='mask-ti'>确定要退出账号吗？</p>
                      <p className='mask-an'>
                          <span onClick={()=>{changelogin(!isback)}}>取消</span>
                          <span onClick={fn1}>确定</span>
                      </p>
                  </div>
              </div>:''}
              
              <div className='mine-top'>
                   <p className='head-portrait'><img></img> <span className='vip'>v1</span></p>
                   
                   <p className='username'>17126712612</p>
                   <p className='qiehuan' onClick={()=>{changelogin(!isback)}}><img src={qiehuan}></img><span>切换账号</span></p>
              </div>
              <div className='mine-bottom'>
                   <ul>
                       <li>
                           <img src={dingdan}></img>
                           <span>我的订单</span>
                       </li>
                       <li>
                           <img src={fukuan}></img>
                           <span>待付款</span>
                       </li>
                       <li>
                           <img src={daishou}></img>
                           <span>待收货</span>
                       </li>
                       <li>
                           <img src={huiyuan}></img>
                           <span>会员等级</span>
                       </li>
                   </ul>
                   <ul>
                       <li>
                           <img src={jifen}></img>
                           <span>积分</span>
                       </li>
                       <li>
                           <img src={yue}></img>
                           <span>余额</span>
                       </li>
                       <li>
                           <img src={hongbao}></img>
                           <span>红包/优惠券</span>
                       </li>
                       <li>
                           <img src={ka}></img>
                           <span>现金卡</span>
                       </li>
                   </ul>
              </div>
        </div>
    )
}
Mine=withRouter(Mine)