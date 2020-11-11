import React,{useState,useEffect} from 'react'
import Banner from '../components/Home/Banner';
import homeData from '../assets/json/home.json';
import Floor from '../components/Home/Floor';
function Home(){
    // let floorData = [];
    const [floorData,changeFloor] = useState([]);
    useEffect(function(){
        console.log("homeData=",homeData);
        const newFloor = homeData.filter(item=>{
            return item.type === 2;
        })
        changeFloor(newFloor);
    },[])
    
    return (
        
       <div>
           {/* 轮播图 */}
           <Banner Bannerlist={homeData[0].source.adsense}></Banner>
           {
            //    console.log("floorData=",floorData)
            //    floorData.map(item=>{
            //        console.log("item=",item);
            //        <Floor data={1}></Floor>
            //    })
    
           }
           <Floor data={floorData}/>
            

       </div>
    )
}


export default Home;