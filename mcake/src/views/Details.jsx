import React, { useState,useEffect } from 'react';

//组件
import Banner from '../components/Home/Banner';

import Data from '../assets/json/detailsTest.json';

console.log("Details.data=",Data);

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



    return (
        <div>
            {console.log("Bannerlist=",bannerData)}
            {/* 轮播图 */}
            <Banner Bannerlist={bannerData}/>
            {/* 可选规格 */}
            <div className="detailsCon">
                
            </div>
        </div>
    )
}

export default Details;