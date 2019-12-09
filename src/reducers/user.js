import {USER_LOGGED_IN,USER_LOGGED_OUT,GET_LOGGED_USER} from '../types'
let token = localStorage.getItem('krealaxJWT')
const initialState = {
    user,
    authenticated: false
}

export default function user(state=initialState, action={}){
    switch(action.type){
        case USER_LOGGED_IN:
            return action.user
        case GET_LOGGED_USER:
            return {
                ...action.user,
                authenticated: true
            }
        case USER_LOGGED_OUT:
            return {}
        default: 
            return state;
    }
}