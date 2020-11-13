import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom';
import App from './App';
// import './assets/iconfont/iconfont.css'

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter

ReactDOM.render(
        <Router>
            <App/>
        </Router>
    ,
    document.querySelector('#root')
)