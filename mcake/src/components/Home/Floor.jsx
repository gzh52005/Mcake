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
                    </div>
                ))
            }
        </div>
        
        
    )
}

export default Floor;