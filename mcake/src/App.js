import React from 'react'
// import store from './store'
import {Link, Route,Redirect,Switch,NavLink,withRouter} from 'react-router-dom'
// import { Menu,Row,Col,Button } from 'antd-mobile'
import Home from './views/Home'
import Cakes from './views/Cakes'
import Snack from './views/Snack'
import Cart from './views/Cart'
import Handpick from './views/handpick'
import './css/App.scss'


 class App extends React.Component{
    constructor(){
        super()
        this.state={
            xianshi:false
        }
      this.gaibian = this.gaibian.bind(this)
    }
    gaibian=()=>{
        this.setState({
            xianshi:!this.state.xianshi
        })
    }


    render(){
  
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
                    <div className='header'>我是头部</div>
                    <Switch>
                   <Route path='/snack' component={Snack}></Route>
                   <Route path='/cart' component={Cart}></Route>
                   {/* <Route path='/login' component={Login}></Route>
                   <Route path='/reg' component={Reg}></Route> */}
                   <Route path='/chucuole' render={()=>(<div>出错了</div>)}></Route>
                   <Redirect from="/" to='/home' exact></Redirect>
                   <Redirect to='/chucuole' ></Redirect>
                    </Switch>
                    <ul className='footer'>
                        <li className='jing' onClick={this.gaibian}>精选</li>
                        <li><NavLink to='/cakes' activeStyle={{color:'#000',fontWeight: 700}}>蛋糕</NavLink></li>
                        <li><NavLink to='/snack' activeStyle={{color:'#000',fontWeight: 700}}>小食</NavLink></li>
                        <li><NavLink to='/cart' activeStyle={{color:'#000',fontWeight: 700}}>购物车</NavLink></li>
     
                </ul>
         
                </div>
        )
    }
}
export default App
// App=withRouter(App)
// App=withRedux(App)
