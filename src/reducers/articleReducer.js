import {GET_ALL_FEEDS,POST_ARTICLES,EDIT_ARTICLES,GET_SINGLE_ARTICLES,
    GET_ALL_ARTICLES,GET_CAT_ARTICLES,
    DELETE_ARTICLES,GET_USER_ARTICLES,CLEAR_ARTICLE, } from '../types'

import { POST_GIFS,GET_ALL_GIFS,GET_SINGLE_GIFS,DELETE_GIFS,PROFILE_PICTURE} from '../types'


export default function articles(state={}, action={}){
    const {payload,type} = action
    
    switch(type){
        case GET_ALL_FEEDS:
            return {
                ...state,
                articles: payload.data
            }
            
        case POST_ARTICLES:
            return {
               articles: [payload.data, ...state.articles]
            }
        case EDIT_ARTICLES:
            return {                    
                ...state,
                payload
            }
        case GET_SINGLE_ARTICLES:
            return {                    
                ...state,
                data: payload.data
            }
        case CLEAR_ARTICLE:
            return {
                
                ...state,
                data: {}
            }
        case GET_ALL_ARTICLES:
            return {                    
                ...state,
                payload
            }
        case GET_USER_ARTICLES:
            return {
                ...state,
                payload
            }
        case GET_CAT_ARTICLES:
            return {                    
                ...state,
                payload
            }
        case DELETE_ARTICLES:
             {

                const index = state.articles.findIndex(post => post.article_id !== payload.data.id);
                 return { ...state,
                    articles: state.articles.filter((_, i) => i !== index)
                 }
            }
            case PROFILE_PICTURE:
                    return {...state,
                        payload
                    }
            //gifs stufss
            case POST_GIFS:
                return {
                    articles: [payload.data, ...state.articles]
                 }
            case GET_ALL_GIFS:
                return {
                    ...state,
                    payload
                }
            case GET_SINGLE_GIFS:
                return {
                    ...state,
                    data: payload.data
                }
            case DELETE_GIFS:
                {

                    const index = state.articles.findIndex(post => post.gif_id !== payload.data.id);
                     return { ...state,
                        articles: state.articles.filter((_, i) => i !== index)
                     }
                }
        
        default: 
            return state;
    }
    
}
