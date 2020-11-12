import React,{useEffect,useState,useRef, useContext} from 'react'
import request from '../utils/request';
import cartLogo from '../assets/images/cart-icon.png'
import context from '../context' 
function Snack(){
    let [goodslist,change] = useState([])
    let [show,isshow]=useState(false)
    let data =  useContext(context).page
    useEffect(function(){
        isshow(true)
       request.get('/cakelist',{page:data,pageSize:8}).then(reg=>{change([...goodslist,...reg.data],isshow(false))})
    },[data]);
    console.log(data);
    console.log(goodslist);
    return (
        <div className='snack'  >
            <ul className='snack-box' >
             {goodslist.map((item)=>{
            return    <li key={item.id}>
            <div >
                    <img src={item.img} style={{}}/>
                    <div className={'describe'}>
                        <div className={"goodsdata"}>
                        <span className='goodsName'>{item.name}</span> <span className='tname'>{item.tname}</span>
             <p className='ename'>{item.french}</p>
                        <p><b>￥</b> <span>{item.price}</span></p>
                        </div>
                        <div className='cartLogo'>
                            <img src={cartLogo} />
                        </div>
                    </div>
            </div>
        </li>
      
        })}
            </ul>
            <div className='loading' style={{display:show?'block':'none'}}></div>
        </div>
    )
}

export default Snack;
