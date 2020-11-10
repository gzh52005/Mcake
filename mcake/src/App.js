import React from 'react'
// import store from './store'
import {Link, Route,Redirect,Switch,NavLink,withRouter} from 'react-router-dom'
// import { Menu,Row,Col,Button } from 'antd-mobile'
import Home from './views/Home'
import List from './views/List'
import Xiao from './views/Xiao'
import Mine from './views/Mine'


 class App extends React.Component{
    constructor(){
        super()
        this.state={
            arr:[{
                id:1,
                path:'/home',
                title:'首页'
            },{
                id:2,
                path:'/list',
                title:'面包'
            },{
                id:3,
                path:'/xiao',
                title:'小食'
            },{
                id:4,
                path:'/mine',
                title:'我的'
            }],
            current:'/home'
        }
    }
    handleClick=({key})=>{
        this.setState({
          current:key
        })
}

    render(){
        let {arr,current}=this.state
    //  console.log(this.props)
        return (
           
                <div>
                <ul>
                    {
                        this.state.arr.map(item=>(
                        <li key={item.id}><NavLink to={item.path}>{item.title}</NavLink></li>
                        ))
                    }
                </ul>
                <Switch>
                   <Route path='/home' component={Home}></Route>
                   <Route path='/list' component={List}></Route>
                   <Route path='/xiao' component={Xiao}></Route>
                   <Route path='/mine' component={Mine}></Route>
                   {/* <Route path='/login' component={Login}></Route>
                   <Route path='/reg' component={Reg}></Route> */}
                   <Route path='/chucuole' render={()=>(<div>出错了</div>)}></Route>
                   <Redirect from="/" to='/home' exact></Redirect>
                   <Redirect to='/chucuole' ></Redirect>
                </Switch>
                </div>
        )
    }
}
export default App
// App=withRouter(App)
// App=withRedux(App)
