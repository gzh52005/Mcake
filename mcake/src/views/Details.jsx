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
    // let [currentSku,setcurrentSku]=useState('')
    useEffect(function(){        
        if(datalist[0]){           
            let newBanner = [];
            datalist[0].pic.list.forEach(item=>{
                newBanner.push(datalist[0].pic.url+item.m);
            });
            changeBanner(newBanner);
        }
        console.log(datalist[0])
    },[datalist]);
    useEffect(function(){
       if(datalist[0]){
        // let newBanner = [];
        changemusi(datalist[0].fname.split(','))
       }
    },[datalist])
    // useEffect(function(){
    //     if(datalist[0]){
    //      // let newBanner = [];
    //      setcurrentSku(datalist[0].sku)
    //     }
    //  },[datalist])
    useEffect(async function(){
        let bcname=props.location.search.slice(1).split('&')[0]
        console.log(bcname)
        let id=parseInt(props.location.search.slice(1).split('&')[1])
        console.log(id)
        let p=await request('/goods/cakesearch',{
            bcname,
            id
        })
        console.log(p)
        changedatalist(p.data)   
    },[])


    /* 规格数据 */
    const [currentSku,setSku] = useState(Data.sku);
    const [currentGuige,setGuige] = useState(Data);

    let changeSku = useCallback(function(currentItem){
        setSku(currentItem.sku);
        setGuige(currentItem);
    },[]);

    /* 不变部分的数据 */
    // const [musi,setMusi] = useState([]);
    // useEffect(function(){
    //     setMusi(Data.fname.split(','));
    // },[])

    const tabs = [
        { title: '商品详情', key: 't1' },
        { title: '商品评论', key: 't2' },
      ]
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
                {datalist[0]?<ul className="mainCon">
                    <li className="mainprice">￥<span>{datalist[0].pprice}</span>
                    </li>
                    <li className="mainGuige">
                        <p>{datalist[0].ahead}</p>
                        <p>{datalist[0].size}</p>
                        <p>{datalist[0].weight}</p>
                        <p>{datalist[0].fittings['51'].name}X{datalist[0].fittings['51'].num}</p>
                    </li>
                </ul>:''}
                
            </div>

            {/* 不变的部分 */}
            <div className="noChange">
                <div className="musi floor">
                    {musi?musi.map((item,index)=>(
                            <span key={index}>{item}</span>
                        )):''}
                    {/* {
                        musi.map((item,index)=>(
                            <span key={index}>{item}</span>
                        ))
                    } */}
                </div>
                <div className="tips floor">
                    <span>!</span>若不及时食用，请放置0-10℃冷藏
                </div>
                <div className="describe">
                    <p>{Data.brief}</p>
                    <p>{Data.frenchBrief}</p>
                </div>
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
                <div className="proTitle">
                    <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}
                    tabBarActiveTextColor={"#000"}
                    tabBarInactiveTextColor={"#8d8d8d"}
                    tabBarUnderlineStyle={{borderColor:"#ffe32a",}}
                    tabBarTextStyle={{fontSize:18}}
                    >
                        <div  className="proDesc proSim">
                            Content of first tab
                        </div>
                        <div className="proComment proSim">
                            Content of second tab
                        </div>
                    </Tabs>

                </div>
            </div>
            
        </div>
    )
}
Details=withRouter(Details)
export default Details;