import {USER_LOGGED_IN,USER_LOGGED_OUT,GET_LOGGED_USER} from '../types';
import api from '../api'
let token = localStorage.getItem('krealaxJWT')


export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const getUserData = (user) => ({
    type: GET_LOGGED_USER,
    user,
    token
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
   
})



export const login = (email,password)=> {
    
    return dispatch => api.user.login(email,password).then(user => {
        console.log(user)
        localStorage.krealaxJWT = user.token
        
        return dispatch(userLoggedIn(user))})}
       // return dispatch(getUser())})}

export const register = (userData)=> {

    return dispatch => api.user.register(userData).then(user => {
        console.log(user)
        
        localStorage.krealaxJWT = user.token
        return dispatch(userLoggedIn(user))})}

export const getUser = ()=> {

    return dispatch => api.user.getUser().then(user => {
        console.log(user)
        return dispatch(getUserData(user))})}




export const logout = ()=>dispatch => {
    
        localStorage.removeItem('krealaxJWT')
        return dispatch(userLoggedOut())}