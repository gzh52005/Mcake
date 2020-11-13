import React,{Component,useRef} from 'react'
import {Link, Route,Redirect,Switch,NavLink,withRouter} from 'react-router-dom'

class Handpick extends Component{
    constructor(props){
        super(props)
        // console.log(this.props);
        this.state={
            goodslist:['全部小食','口味筛选','场景筛选','所有小食','所有配件']
        }
        
    }
    componentDidMount(){
        // this.el.style.transition= 'all 0.5s'
       
    }
    
    componentDidUpdate(){
        // console.log(this.props.status);
        if(this.props.status.isshow){
            setTimeout(()=>{
                this.el.style.left = 0;
                        })
        }else{

            this.el.style.left=-50+'vw'
        }
    }
    render(){
        // console.log(1);
            return  (
                <div className='drawer' ref={el=>{this.el = el}}>
                  <ul>
                  {/* {this.state.goodslist.map((item=>( */}
                    <li>全部小食<span> <i>32</i>  </span></li>
                    <li>口味筛选<span> <i className='icon sjt'></i>  </span></li>
                    <li>场景筛选<span> <i className='icon sjt'></i>  </span></li>
                    <li>所有小食<span> <i>18</i>  </span></li>
                    <li>所有配件<span> <i>4</i>  </span></li>
                    {/* )))} */}
                  </ul>
                </div>
            )
        }
        
}
export default Handpick