import {GET_ALL_FEEDS, POST_GIFS,GET_ALL_GIFS,GET_SINGLE_GIFS,DELETE_GIFS} from '../types'


export default function userAction(state={}, action={}){
    const { type, payload } = action
    switch(type){
        case GET_ALL_FEEDS:
            return {
                ...state,
                payload
            }
        case POST_GIFS:
            return {
                ...state,
                payload
            }
        case GET_ALL_GIFS:
            return {
                ...state,
                payload
            }
        case GET_SINGLE_GIFS:
            return {
                ...state,
                payload
            }
        case DELETE_GIFS:
            return {
                ...state,
                payload
            }
        default: 
            return state;
    }
}