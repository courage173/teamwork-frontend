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
import { userLoggedIn,getUser } from './actions/auth';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger()

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,loggerMiddleware)))

if(localStorage.krealaxJWT){
    const user = {token: localStorage.krealaxJWT};
    store.dispatch(userLoggedIn(user))
    store.dispatch(getUser())
}
ReactDOM.render(
<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>
    , document.getElementById('root'));
