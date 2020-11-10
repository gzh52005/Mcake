/**
 * 高阶组件
    * 把组件作为参数传入
    * 返回一个新的组件
    
    * 注意：封装高阶组件一定要传递props
* 高阶组件定义方式
    * 定义方式一： 属性代理
    * 定义方式二： 反向继承
        > 一般用于类组件
 */
import React from 'react';
import {Redirect} from 'react-router-dom'
import request from '@/utils/request'
// import {message} from 'antd'
import store from '@/store'

 export function withUser(InnerComponent){
    return function OuterComponent(props){
        console.log('OuterComponent.props=',props)
        let data = localStorage.getItem('currentUser');
        let currentUser
        try{
            currentUser = JSON.parse(data);
        }catch(err){
            currentUser = data;
        }
        return <InnerComponent {...props} currentUser={currentUser} />
    }
 }

// 加强版
// 练习：加强版2.0
export function withStorage(key){
    return function(InnerComponent){
        return function OuterComponent(props){
            let data = localStorage.getItem(key);
            try{
                data = JSON.parse(data);
            }catch(err){
                data = data;
            }
            const storage = {
                [key]:data
            }
            return <InnerComponent {...props} {...storage}  />
        }
    }
}


export function withAuth(InnerComponent){
    @withUser
    // 反向继承（要求传入的组件必须为类组件）
    // class OuterComponent extends InnerComponent{
    //     render(){
    //         console.log('withAuth.props=',this.props);
    //         const {user} = this.props;
    //         if(user){
    //             return super.render()
    //         }
    //         return <Redirect to="/login" />
    //     }
    // }
    // OuterComponent = withUser(OuterComponent)


    class OuterComponent extends React.Component{
        async componentDidMount(){
            const {currentUser} = this.props;

            // 校验token
            if(currentUser){
                const data = await request.get('/user/verify',{},{
                    headers:{
                        Authorization:currentUser.Authorization
                    }
                });
    
                console.log('verify=',data);
                if(data.status === 401){
                    // message.error('登录已失效，请重新登录')
                    console.log('登录已失效，请重新登录');
                    this.props.history.replace({
                        pathname:'/login',
                        search:'?redirectTo='+this.props.location.pathname
                    })
                }

            }
        }
        render(){
            const {currentUser} = this.props;
            if(currentUser){
                return <InnerComponent {...this.props} />
            }else{
                return <Redirect to={"/login?redirectTo="+this.props.location.pathname} />
            }
        }
    }
    return OuterComponent
}

// redux数据使用高阶组件
export function withRedux(InnerComponent){
    return class OuterComponent extends React.Component{
        state = {
            data:{

            }
        }
        componentDidMount(){
            const data = store.getState();
            this.setState({
                data
            });

            store.subscribe(()=>{
                const data = store.getState();
                this.setState({
                    data
                });
            })
        }
        render(){
            return <InnerComponent {...this.props} storeState={this.state.data} dispatch={store.dispatch} />
        }
    }
}