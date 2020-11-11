import React,{useState,useEffect} from 'react'
import Banner from '../components/Home/Banner';
import Floor from '../components/Home/Floor';
import Division from '../components/Home/Division';

import homeData from '../assets/json/home.json';

import '../css/home.scss';
import footerLogo from '../assets/images/Home/logo2.png';
import weibo from '../assets/images/Home/weibo.png';
import weixin from '../assets/images/Home/weixin.png';
import wx_code from '../assets/images/Home/wx_code.jpg';


function Home(){
    // let floorData = [];
    const [floorData,changeFloor] = useState([]);
    const [divisionData,changeDivision] = useState([]);
    useEffect(function(){
        console.log("homeData=",homeData);
        const newFloor = homeData.filter(item=>{
            return item.type === 2;
        })
        changeFloor(newFloor);
    },[])

    useEffect(function(){
        const division = homeData.filter(item=>{
            return item.display === 1;
        })
        changeDivision(division);
    },[])
    
    return (
        
       <div>
           {/* 轮播图 */}
           <Banner Bannerlist={homeData[0].source.adsense}></Banner>
           {/* 产品楼层 */}
           <Floor data={floorData}/>
            {/* 专区 */}
            <Division data={divisionData}/>
            {/* 底部 */}
            <ul className="homeBottom">
                <li className="footerLogo">
                    <img src={footerLogo} alt="" />
                </li>
                <li className="wxCode">
                    <img src={wx_code} alt=""/>
                </li>
                <li className="chat">
                    <img src={weibo} alt=""/>
                    <img src={weixin} alt=""/>
                </li>
                <li className="copyRight">
                    <p>Copyright © 2012-2020 上海卡法电子商务有限公司 版权所有 </p>
                    <p>沪ICP备12022075号 沪公网安备31010702005582号</p>
                </li>
            </ul>
       </div>
    )
}


export default Home;