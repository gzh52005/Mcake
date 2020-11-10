import React from 'react'
// import store from './store'
import {Link, Route,Redirect,Switch,NavLink,withRouter} from 'react-router-dom'
// import { Menu,Row,Col,Button } from 'antd-mobile'
import Home from './views/Home'
import Cakes from './views/Cakes'
import Snack from './views/Snack'
import Cart from './views/Cart'

import './css/App.scss'



 class App extends React.Component{
    constructor(){
        super()
        this.state={
            xianshi:false
        }
    }
    gaibian=()=>{
        this.setState({
            xianshi:!this.state.xianshi
        })
    }
//     handleClick=({key})=>{
//         this.setState({
//           current:key
//         })
// }

    render(){
        // let {arr,current}=this.state
    //  console.log(this.props)
        return (
           
                <div className='box'>
                    {this.state.xianshi?<div className='mask' onClick={this.gaibian}>遮罩</div>:''}
                    
                    <div className='header'>我是头部</div>
                    <Switch>
                   {/* <Route path='/home' component={Home}></Route> */}
                   <Route path='/cakes' component={Cakes}></Route>
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
                    {/* {
                        this.state.arr.map(item=>(
                        <li key={item.id}><NavLink to={item.path}>{item.title}</NavLink></li>
                        ))
                    } */}
                </ul>
                
                </div>
        )
    }
}
export default App
// App=withRouter(App)
// App=withRedux(App)
