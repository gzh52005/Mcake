import React,{useRef} from 'react'
// import store from './store'

import { Route,Redirect,Switch,NavLink,withRouter} from 'react-router-dom'
// import { Menu,Row,Col,Button } from 'antd-mobile'
import Home from './views/Home'
import Cakes from './views/Cakes'
import Snack from './views/Snack'
import Cart from './views/Cart.jsx'
import Handpick from './views/handpick'
import Details from './views/Details'
import Mine from './views/Mine'
import Login from './views/Login'
import Reg from './views/Reg'
import './css/App.scss'
// import './assets/iconfont/iconfont.css'
import logo from './assets/images/logo.png'
import  maps from './assets/images/mine/map.png'
import  fangdajing from './assets/images/mine/fangdajing.png'
import  caidan from './assets/images/mine/caidan.png'
import  dangao from './assets/images/mine/dangao.png'
import  dizhi from './assets/images/mine/dizhi.png'
import  guanyu from './assets/images/mine/guanyu.png'
import  wode from './assets/images/mine/wode.png'
import  zuo from './assets/images/mine/zuo.png'
import  cart from './assets/images/mine/cart.png'
import 'antd-mobile/dist/antd-mobile.css'; 

 
import context from './context'

function throttle(that,interval){
    // console.log(that);
    let path =  that.props.location.pathname
    var timer = null;
    var page =that.state.page
    return function(el){
        // console.log(timer);
        if(!timer){
            timer=setTimeout(()=>{
                if( el.target.scrollHeight-el.target.scrollTop<750&&page<(path==='/snack'?3:4)){
                    ++page;   
                    that.setState({page})
                }
                timer=null
            },interval)
        }
    }
}
class App extends React.Component{
    constructor(props){
        super(props)
        // console.log(this.props);
        this.state={
            xianshi:false,
            caidanshow:false,
            page:1
        }
        this.gaibian = this.gaibian.bind(this)
    }
    gaibian=()=>{
        this.setState({
            xianshi:!this.state.xianshi
        })
    }
    gaicaidan=(e)=>{
        e.stopPropagation()
        this.setState({
            caidanshow:!this.state.caidanshow
        })
    }    
    goto=()=>{
         
       this.props.history.push('/mine?'+this.props.location.pathname)
    }
    goback=()=>{
        let path=this.props.location.search.slice(1)
        this.props.history.push(path)
    }
    resetPage=()=>{
        this.setState({page:1})
    }

    render(){
      
        // console.log(this.props);
        const that = this
        return (
           
                 <div className='box'>
                    {
                     <div className='mask' style={{display:this.state.xianshi?'block':'none'}} onClick={(e)=>{
                            if(e.target.className=='mask')
                               this.gaibian()
                      }}>
                          <Handpick status={{isshow:this.state.xianshi}}/>
                      </div>
                    }                    
                    
                    
                    <div className='header'>
                    {(this.props.location.pathname === '/cart' || this.props.location.pathname === '/mine'|| this.props.location.pathname === '/login'|| this.props.location.pathname === '/reg') ?<img className='zuo' src={zuo} onClick={this.goback}></img>:<p className='header-left'><img src={maps}></img><span>北京市</span></p>}
                        
                        <NavLink to='/home'><img className='logos'  src={logo}></img></NavLink>
                        <p className='header-right'>
                            <span>{(this.props.location.pathname === '/cart' || this.props.location.pathname === '/mine'|| this.props.location.pathname === '/login'|| this.props.location.pathname === '/reg') ?<img src={cart} onClick={()=>{this.props.history.push('/cart')}}></img>:<img src={fangdajing}></img>}</span>
                            <i className='ge'></i>
                            <span onClick={this.gaicaidan}><img src={caidan}></img></span></p>
                        
                    </div>
                    {this.state.caidanshow?<div className='header-mask' onClick={this.gaicaidan}>
                         <ul>
                             <li><img src={dangao}></img><span>最新活动</span></li>
                             <li onClick={this.goto}><img src={wode}></img><span>个人中心</span></li>
                             <li><img src={guanyu}></img><span>关于我们</span></li>
                             <li><img src={dizhi}></img><span>配送范围</span></li>
                         </ul>
                    </div>:''}
                    
                    <div className='container'  onScroll={throttle(that,500)}>
            <context.Provider value={{page:this.state.page}}>
            <Switch>
                   <Route path='/home' component={Home}></Route>
                   <Route path='/reg' component={Reg}></Route>
                   <Route path='/login' component={Login}></Route>
                   <Route path='/cakes' component={Cakes}></Route>
                   <Route path='/snack' component={Snack}></Route>
                   <Route path='/cart' component={Cart}></Route>
                   <Route path='/details/:id' component={Details}></Route>
                   <Route path='/mine' component={Mine}></Route>
                   {/* <Route path='/login' component={Login}></Route>
                   <Route path='/reg' component={Reg}></Route> */}
                   <Route path='/chucuole' render={()=>(<div>出错了</div>)}></Route>
                   <Redirect from="/" to='/home' exact></Redirect>
                   <Redirect to='/chucuole' ></Redirect>
                    </Switch>
            </context.Provider>
                    </div>
                    {
                        
                        (this.props.location.pathname === '/cart' || this.props.location.pathname. includes('/details')|| this.props.location.pathname === '/mine'||this.props.location.pathname === '/reg'||this.props.location.pathname === '/login') ? <React.Fragment></React.Fragment>
                        :<ul className='footer'>
                        <li className='jing' onClick={this.gaibian}>精选</li>
                        <li><NavLink to='/cakes' onClick={this.resetPage} activeStyle={{color:'#000',fontWeight: 700}}>蛋糕</NavLink></li>
                        <li><NavLink to='/snack' onClick={this.resetPage} activeStyle={{color:'#000',fontWeight: 700}}>小食</NavLink></li>
                        <li><NavLink to={`/cart?${this.props.location.pathname}`} activeStyle={{color:'#000',fontWeight: 700}}>购物车</NavLink></li>
                    </ul>
                    }
                </div>
        )
    }
}

App = withRouter(App)
export default App
// App=withRouter(App)
// App=withRedux(App)
