import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom';
import App from './App';
// import './assets/iconfont/iconfont.css'
import {Provider} from 'react-redux'

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter

ReactDOM.render(
    // <Provider store={store}>
        <Router>
            <App/>
        </Router>
    //  </Provider>
    ,
    document.querySelector('#root')
)