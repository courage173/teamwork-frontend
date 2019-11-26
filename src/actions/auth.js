import {USER_LOGGED_IN,USER_LOGGED_OUT} from '../types';
import api from '../api'

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})
export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
   
})



export const login = (user)=> {
    console.log(user)
    return dispatch => api.user.login(user).then(user => {
        console.log(user)
        localStorage.krealaxJWT = user.token
        return dispatch(userLoggedIn(user))})}



export const logout = ()=>dispatch => {
    
        localStorage.removeItem('krealaxJWT')
        return dispatch(userLoggedOut())}