import React, { useState,useEffect, useCallback, useMemo } from 'react';
import {withRouter} from 'react-router-dom'
//组件
import Banner from '../components/Home/Banner';
import { Tabs,WhiteSpace } from 'antd-mobile';
import request from '../utils/request'
// 样式
import '../css/details.scss';

import Data from '../assets/json/detailsTest.json';
import { defaultProps } from 'antd-mobile/lib/search-bar/PropsType';

// console.log("Details.data=",Data);
// 促销数据
const promotion = [
    {"id":1212,"type":7,"channelStr":"","ptype":2,"title":"买蛋糕可至购物车参加优惠换购","remark":"买蛋糕可至购物车参加优惠换购","tag":"换购","recommend":0},{"id":1891,"type":2,"channelStr":"1035","ptype":2,"title":"2020年11月会员日","remark":"限时限量特价","tag":"特价","recommend":0},{"id":1839,"type":1,"channelStr":"1112","ptype":2,"title":"2020年中秋节礼品卡兑换","remark":"2020年中秋节礼品卡兑换","tag":"立减","recommend":1},{"id":1895,"type":2,"channelStr":"336","ptype":1,"title":"内部员工订单免运费","remark":"内部员工订单免运费","tag":"免邮","recommend":0},{"id":1874,"type":8,"channelStr":"","ptype":1,"title":"9周年庆","remark":"限量赠礼","tag":"赠品","recommend":0}
] 


function Details(props){
    /* 轮播图数据 */
    const [bannerData,changeBanner] = useState([]);
    let [datalist,changedatalist]=useState([])
    let [musi,changemusi]=useState('')
    let [currentSku,setcurrentSku]=useState('')
    let [shoplist,setshoplist]=useState('')
    let [qiehuan,setqiehuan]=useState(1)
    let [shouwei,changeshouwei]=useState(false)
    let [jieguo,setjieguo]=useState(false)
    let [num,setnum]=useState(0)
    useEffect(function(){        
        if(datalist[0]){           
            let newBanner = [];
            datalist[0].pic.list.forEach(item=>{
                newBanner.push(datalist[0].pic.url+item.m);
            });
            changeBanner(newBanner);
        }
        // console.log(datalist[0])
    },[datalist]);
    useEffect(function(){
       if(datalist[0]){
        
        
        let regs=/,/
        if(regs.test(datalist[0].fname)){
            changemusi(datalist[0].fname.split(','))
            
        }else if(datalist[0].fname){
            let newmusi = [];
            newmusi.push(datalist[0].fname)
            changemusi(newmusi)
            
        }
        
        
       }
    },[datalist])
    useEffect(function(){
        if(datalist[0]){
         setcurrentSku(datalist[0].sku)
        }
     },[datalist])
     useEffect(function(){
        if(datalist[0]){
         // let newBanner = [];
         setshoplist(datalist[0])
        }
     },[datalist])
    useEffect(async function(){
        let bcname=props.location.search.slice(1).split('&')[1]
        // console.log(bcname)
        let id=parseInt(props.location.search.slice(1).split('&')[2])
        // console.log(id)
        let p=await request('/goods/cakesearch',{
            bcname,
            id
        })
        console.log(p.data[0])
        changedatalist(p.data)   
    },[])
    let changeSku = useCallback(function(shop){
        // console.log(shop)
        setcurrentSku(shop.sku);
        setshoplist(shop)
        // setGuige(currentItem);
    },[]);

    let fn1=useCallback(function(){
        if(!localStorage.getItem('currentUser')){
            changeshouwei(true)
        }else{
            var bcname=props.location.search.slice(1).split('&')[1]
            var id=parseInt(props.location.search.slice(1).split('&')[2])
            // console.log(bcname)
            // console.log(id)
            // console.log('第一次',num)
            console.log(shoplist.id)
             
            setnum(num++)
            // console.log('第二次',num)
            request.put('/cart/push/'+JSON.parse(localStorage.getItem('currentUser')).username,{
                id,
                checkid:shoplist.id,
                num,
                bcname
            }).then(res=>{
                if(res.code==200){
                    setjieguo(true)
                    setTimeout(()=>{setjieguo(false)},2000)
                }
                
            })
            // console.log('第三次',num)
        }
        
    },[shoplist])
    let fn2=useCallback(function(){
        if(!localStorage.getItem('currentUser')){
            changeshouwei(true)
        }else{
            var bcname=props.location.search.slice(1).split('&')[1]
            var id=parseInt(props.location.search.slice(1).split('&')[2])
            setnum(num++)
            request.put('/cart/push/'+JSON.parse(localStorage.getItem('currentUser')).username,{
                id,
                checkid:shoplist.id,
                num,
                bcname
            }).then(res=>{
                if(res.code==200){
                    setjieguo(true)
                    setTimeout(()=>{setjieguo(false)
                        props.history.push('/cart')
                    },500)

                }
                
            })
        }
        
    },[shoplist,datalist])
    let fn3=useCallback(function(){
        // console.log(props)
        props.history.push('/login')
    },[])
    let fn4=useCallback(function(){
        changeshouwei(false)        
    },[])
    
    return (
        <div className="detailsContainer">
            {/* {console.log("currentGuige=",currentGuige)} */}

            {/* 轮播图 */}
            <Banner Bannerlist={bannerData}/>

            {/* 可选规格 */}
            <div className="detailsMain">
                {(datalist[0] && datalist[0].list.length>1)?<ul className="mainTitle">
                    {datalist[0].list.map(item=>(
                           <li key={item.id}
                           className={item.sku===currentSku?'activeWeight':''}
                           onClick={changeSku.bind(null,item)}
                           >
                                <p>{item.spec}</p>
                                <p>({item.weight})</p>
                                <span>{item.edible}</span>
                           </li>
                       ))
                    }
                </ul>:''}
                {shoplist?<ul className="mainCon">
                    <li className="mainprice">￥<span>{shoplist.pprice}</span>
                    </li>
                    <li className="mainGuige">
                        <p>{shoplist.ahead}</p>
                        <p>{shoplist.size}</p>
                        <p>{shoplist.spec}</p>
                        {Object.prototype.toString.call(shoplist.fittings) === "[object Object]" ? <p>{shoplist.fittings['51'].name}X{shoplist.fittings['51'].num}</p>:''}
                        
                    </li>
                </ul>:''}
                
            </div>

            {/* 不变的部分 */}
            <div className="noChange">
                {musi?<div className="musi floor">
                    {musi.map((item,index)=>(
                            <span key={index}>{item}</span>
                        ))}

                </div>:''}
                
                <div className="tips floor">
                    <span>!</span>若不及时食用，请放置0-10℃冷藏
                </div>
                {datalist[0]? <div className="describe">
                    <p>{datalist[0].brief}</p>
                    <p>{datalist[0].frenchBrief}</p>
                </div>:""}
               
                <div className="promotion floor">
                    <span>促销</span>
                    <ul>
                        {
                            promotion.map(item=>(
                                <li key={item.id}>
                                    <i>{item.tag}</i>
                                 {item.title}</li>
                            ))
                        }
                    </ul>
                    <span>详情 &gt;</span>
                </div>
            </div>

            {/* 商品详情和商品评价 */}
            <div className="product">
               <span className={qiehuan==1?'active':''} onClick={()=>{setqiehuan(1)}}>商品详情</span>
               <span className={qiehuan==2?'active':''} onClick={()=>{setqiehuan(2)}}>商品点评</span>
            </div>
            
            <div className='kouwei'>
            {datalist[0]?datalist[0].basic.list.map(item=>(<p key={item.gid}>
                    <span>{`${item.french} ${item.name}`}</span>
                    <span>{item.value}</span>
                </p>)):''}

            </div>
            <div className='country'>
            {datalist[0]?datalist[0].mater.list.map((item,index)=>(
                <span key={index}><img src={`${datalist[0].mater.url}${item.img}`}></img> {item.name}</span>
            )):''}
                
            </div>
            {(()=>{
                if(datalist[0]){
                  return  <div className='datail-img'dangerouslySetInnerHTML={{__html:datalist[0].details}}></div>
                }
            })()}
            <p className='datail-caozuo'>
                <span onClick={fn1}>加入购物车</span>
                <span onClick={fn2}>立即购买</span>
            </p>
            {shouwei?<div className='details-mask'>
                  <div>
                      <h4>温馨提示</h4>
                      <p className='mask-ti'>您需要先登录才能继续您的操作</p>
                      <p className='mask-an'>
                          <span onClick={fn4}>以后再说</span>
                          <span onClick={fn3}>立即登录</span>
                      </p>
                  </div>
              </div>:''}
              {jieguo?<p className='detail-tishi'><span>加入购物车成功</span></p>:''}
        </div>
    )
}
Details=withRouter(Details)
export default Details;