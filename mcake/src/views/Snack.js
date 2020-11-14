import React,{useEffect,useState,useRef, useContext,useCallback} from 'react'
import {withRouter} from 'react-router-dom'
import request from '../utils/request';
import cartLogo from '../assets/images/cart-icon.png'
import context from '../context' 
import CartMask from '../components/Home/CartMask.jsx'
function Snack(props){
    let [goodslist,change] = useState([])
    const [show,isshow]=useState(false)
    const [cartShow,changeShow]= useState(false)
    const [goodsData,changedata] = useState({})
    let data =  useContext(context).page
    useEffect(function(){
        isshow(true)
       request.get('/goods/snacklist',{page:data,pageSize:6}).then(reg=>{change([...goodslist,...reg.data],isshow(false))})
    },[data]);
    return (
        <div className='snack'  >
            <ul className='snack-box' >
             {goodslist.map((item)=>{
            return    <li key={item.id}>
            <div >
                    <img src={item.img} style={{}} onClick={(e)=>{e.stopPropagation()
                         props.history.push('/details?'+props.location.pathname+'&snack&'+item.id)}}
                          />
                    <div className={'describe'}>
                        <div className={"goodsdata"}>
                        <span className='goodsName'>{item.name}</span> <span className='tname'>{item.tname}</span>
             <p className='ename'>{item.french}</p>
                        <p><b>￥</b> <span>{item.price}</span></p>
                        </div>
                        <div className='cartLogo'onClick={()=>{changedata(item);changeShow(!cartShow) }}>
                            <img src={cartLogo} />
                        </div>
                    </div>
            </div>
        </li>
      
        })}
            </ul>
           {cartShow ?<CartMask showCart={cartShow} showData={goodsData} changeShow={changeShow}/>:''}  
            <div className='loading' style={{display:show?'block':'none'}}></div>
        </div>
    )
}
Snack=withRouter(Snack)
export default Snack;
