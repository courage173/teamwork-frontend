import {POST_ARTICLES,EDIT_ARTICLES,GET_SINGLE_ARTICLES,
    GET_ALL_ARTICLES,GET_CAT_ARTICLES,
    POST_ARTICLE_COMMENT,DELETE_ARTICLES,GET_USER_ARTICLES} from '../types'


export default function articles(state={}, action={}){
    const {payload,type} = action
    switch(type){
        case POST_ARTICLES:
            return {
                ...state,
                payload
            }
        case EDIT_ARTICLES:
            return {                    
                ...state,
                payload
            }
        case GET_SINGLE_ARTICLES:
            return {                    
                ...state,
                payload
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
            return {
                ...state,
                gifs: state.articles.filter(post => post.article_id !==payload)
            }
        default: 
            return state;
    }
}