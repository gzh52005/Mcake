import React from 'react';

import '../../css/home.scss';

function Division(props){
    console.log("division.props=",props);
    return (
        <div>
            {
                props.data.map(item=>(
                    <div className="division" key={item.id}>
                        <div className="title">{item.title}
                        <span>{item.info}</span>
                        </div>
                        <div className="divisionImg">
                            <img src={item.source.adsense[0].img} alt=""/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Division;