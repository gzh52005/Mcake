import React,{useEffect,useState, useContext} from 'react'
import request from '../utils/request';
import cartLogo from '../assets/images/cart-icon.png'
import { withRouter } from 'react-router-dom';
function List(props){
    const name =props.location.pathname.substring(6)
    let [goodslist,change] = useState([])
    let [show,isshow]=useState(false)
    // let data =  useContext(context).page
    useEffect(function(){
        isshow(true)
       request.get('/goods/regfind/',{fname:name}).then(reg=>{change(reg.data);isshow(false)})
    },[name]);
    console.log(goodslist);
    return (
        <div className='snack'  >
            <ul className='snack-box' >
             {goodslist.map((item)=>{
            return    <li key={item.id}>
            <div >
                    <img src={item.img} style={{}} onClick={(e)=>{
                                            e.stopPropagation()
                                            if(item.bcname=='周边商品'){
                                                props.history.push('/details?'+props.location.pathname+'&snack&'+item.id)
                                            }else if(item.bcname=='蛋糕'){
                                                props.history.push('/details?'+props.location.pathname+'&cake&'+item.id)
                                            }else if(item.bcname=='商品配件'){
                                                props.history.push('/details?'+props.location.pathname+'&parts&'+item.id)
                                            }
                                        }}/>
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
export default withRouter(List);
