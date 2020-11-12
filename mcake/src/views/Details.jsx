import React, { useState,useEffect, useCallback } from 'react';

//组件
import Banner from '../components/Home/Banner';

// 样式
import '../css/details.scss';

import Data from '../assets/json/detailsTest.json';

console.log("Details.data=",Data);

// 促销数据
const promotion = [{"id":1212,"type":7,"channelStr":"","ptype":2,"title":"买蛋糕可至购物车参加优惠换购","remark":"买蛋糕可至购物车参加优惠换购","tag":"换购","recommend":0},{"id":1891,"type":2,"channelStr":"1035","ptype":2,"title":"2020年11月会员日","remark":"限时限量特价","tag":"特价","recommend":0},{"id":1839,"type":1,"channelStr":"1112","ptype":2,"title":"2020年中秋节礼品卡兑换","remark":"2020年中秋节礼品卡兑换","tag":"立减","recommend":1},{"id":1895,"type":2,"channelStr":"336","ptype":1,"title":"内部员工订单免运费","remark":"内部员工订单免运费","tag":"免邮","recommend":0},{"id":1874,"type":8,"channelStr":"","ptype":1,"title":"9周年庆","remark":"限量赠礼","tag":"赠品","recommend":0}] 


function Details(){
    /* 轮播图数据 */
    const [bannerData,changeBanner] = useState([]);
    useEffect(function(){
        let newBanner = [];
        Data.pic.list.forEach(item=>{
            newBanner.push(Data.pic.url+item.m);
        });
        changeBanner(newBanner);
    },[]);

    /* 规格数据 */
    const [currentSku,setSku] = useState(Data.sku);
    const [currentGuige,setGuige] = useState(Data);

    let changeSku = useCallback(function(currentItem){
        setSku(currentItem.sku);
        setGuige(currentItem);
    },[]);

    /* 不变部分的数据 */
    const [musi,setMusi] = useState([]);
    useEffect(function(){
        setMusi(Data.fname.split(','));
    },[])


    return (
        <div>
            {/* {console.log("currentGuige=",currentGuige)} */}

            {/* 轮播图 */}
            <Banner Bannerlist={bannerData}/>

            {/* 可选规格 */}
            <div className="detailsMain">
                <ul className="mainTitle">
                    {
                       Data.list.map(item=>(
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
                </ul>
                <ul className="mainCon">
                    <li className="mainprice">￥<span>{currentGuige.pprice}</span>
                    </li>
                    <li className="mainGuige">
                        <p>{currentGuige.ahead}</p>
                        <p>{currentGuige.size}</p>
                        <p>{currentGuige.weight}</p>
                        <p>{currentGuige.fittings['51'].name}X{currentGuige.fittings['51'].num}</p>
                    </li>
                </ul>
            </div>

            {/* 不变的部分 */}
            <div className="noChange">
                <div className="musi floor">
                    {
                        musi.map((item,index)=>(
                            <span key={index}>{item}</span>
                        ))
                    }
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

            <div className="product">
                <ul className="proTitle">
                    <li>商品详情</li>
                    <li>商品点评</li>
                </ul>
            </div>
        </div>
    )
}

export default Details;