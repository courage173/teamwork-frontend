import {POST_CATEGORIES,EDIT_CATEGORIES,GET_ALL_CATEGORIES,GET_SINGLE_CATEGORIES,DELETE_CATEGORIES} from '../types'


export default function categories(state={}, action={}){
    const {payload,type} = action
    switch(type){
        case POST_CATEGORIES:
            return {
                ...state,
                payload
            }
        case EDIT_CATEGORIES:
            return {
                ...state,
                payload
            }  
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                payload
            }
        case GET_SINGLE_CATEGORIES:
            return {
                ...state,
                payload
            }
        case DELETE_CATEGORIES:
            return {
                ...state,
                cat: state.categories.filter(cat => cat.categoryId !==payload)
            }           
        default: 
            return state;
    }
}