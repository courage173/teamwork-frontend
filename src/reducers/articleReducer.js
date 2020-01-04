import {GET_ALL_FEEDS,POST_ARTICLES,EDIT_ARTICLES,GET_SINGLE_ARTICLES,
    GET_ALL_ARTICLES,GET_CAT_ARTICLES,
    POST_ARTICLE_COMMENT,DELETE_ARTICLES,GET_USER_ARTICLES} from '../types'

import { POST_GIFS,GET_ALL_GIFS,GET_SINGLE_GIFS,DELETE_GIFS,POST_GIF_COMMENT} from '../types'


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
        case POST_ARTICLE_COMMENT:
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

                    const index = state.articles.findIndex(post => post.article_id !== payload.data.id);
                     return { ...state,
                        articles: state.articles.filter((_, i) => i !== index)
                     }
                }
            case POST_GIF_COMMENT:
                return {
                    ...state,
                    payload
                }
        default: 
            return state;
    }
    
}