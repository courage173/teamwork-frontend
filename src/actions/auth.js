import {USER_LOGGED_IN,USER_LOGGED_OUT,GET_LOGGED_USER,PROFILE_PICTURE} from '../types';
import api from '../api'
let token = localStorage.getItem('krealaxJWT')


export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const getUserData = (user) => ({
    type: GET_LOGGED_USER,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
   
})

export const uploadImage = (payload) => ({
    type: PROFILE_PICTURE,
    payload
})



export const login = (email,password)=> {
    
    return dispatch => api.user.login(email,password).then(user => {
        console.log(user)
        localStorage.krealaxJWT = user.token
        
       // return dispatch(userLoggedIn(user))})}
       return dispatch(getUser())})}

export const register = (
    email,
    password, 
    first_name,
    last_name,
    jobroles,
    is_admin ,
    department,
    address 
)=> {

    return dispatch => api.user.register(
        email,
        password, 
        first_name,
        last_name,
        jobroles,
        is_admin ,
        department,
        address 
    ).then(user => {
        console.log(user)
        
        
        })}


//uploading profile picture
export const uploadProfilePic = (form_data) => {
    return dispatch => api.user.uploadPic(form_data)
        .then(payload=> {
            dispatch(getUser())
            return dispatch(uploadImage(payload))
        })
}

export const getUser = ()=> {

    return dispatch => api.user.getUser().then(user => {
        console.log(user)
        return dispatch(getUserData(user))})}




export const logout = ()=>dispatch => {
    
        localStorage.removeItem('krealaxJWT')
        return dispatch(userLoggedOut())}