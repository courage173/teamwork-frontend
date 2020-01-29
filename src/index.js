import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import jwt_decode from 'jwt-decode'
import { getUser ,logout} from './actions/auth';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger()

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,loggerMiddleware)))
export let toke = localStorage.krealaxJWT
 
if(localStorage.krealaxJWT){
    const decoded  = jwt_decode(localStorage.krealaxJWT)
    if (decoded.exp * 1000 < Date.now()){
        console.log(decoded.exp * 1000 < Date.now())
        store.dispatch(logout())
        window.location.href = '/'
    }else{ 
        
        store.dispatch(getUser())
    }
    
}


ReactDOM.render(
<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>
    , document.getElementById('root'));
