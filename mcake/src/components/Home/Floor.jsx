import React from 'react';
import '../../css/home.scss';
import titleImg from '../../assets/img/icon_cj.png';

function Floor(props){
    console.log("props=",props);
   
    return (
        <div>
            {
                props.data.map(item=>(
                    <div className="floor" key={item.id}>
                        <div className="title">
                            <img src={titleImg} alt=""/>
                            <div className="titleCon">
                                <p className="cname">{item.title}</p>
                                <p className="ename">{item.info}</p>
                            </div>
                            <div className="titleAlias">
                                {item.alias}
                            </div>
                        </div>
                        <div className="bigImg">
                            <img src={item.source.adsense[0].img} alt=""/>
                        </div>
                        <ul className="floorCon">
                            {
                                item.source.goods.map(goods=>(
                                    <li className="conProduct" key={goods.id}>
                                        <div className="conImg"><img src={goods.img} alt=""/></div>
                                        <b>{goods.name}</b>
                                        <p>{goods.french}</p>
                                        <span>{goods.price}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
        
        
    )
}

export default Floor;