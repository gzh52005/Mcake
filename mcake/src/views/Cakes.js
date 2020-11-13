import React,{useEffect,useState,useRef, useContext} from 'react'
import request from '../utils/request';
import cartLogo from '../assets/images/cart-icon.png'
import context from '../context' 
import CartMask from '../components/Home/CartMask.jsx';
function Cakes(){
    let [goodslist,change] = useState([])
    let [show,isshow]=useState(false)
    const [cartShow,changeShow]= useState(false)
    const [goodsData,changedata] = useState({})
    let data =  useContext(context).page
    useEffect(function(){
        isshow(true)
       request.get('/goods/cakelist',{page:data,pageSize:8}).then(reg=>{change([...goodslist,...reg.data],isshow(false))})
    },[data]);
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

export default Cakes;
