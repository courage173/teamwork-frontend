import {GET_ALL_FEEDS,POST_ARTICLES,EDIT_ARTICLES,GET_SINGLE_ARTICLES,
    GET_ALL_ARTICLES,GET_CAT_ARTICLES,
    POST_ARTICLE_COMMENT,DELETE_ARTICLES,GET_USER_ARTICLES} from '../types'


export default function articles(state={}, action={}){
    const {payload,type} = action
    
    switch(type){
        case GET_ALL_FEEDS:
            return {
                ...state,
                article: payload
            }
            
        case POST_ARTICLES:
            return {
                ...state,
               articles: ([payload]).concat(state.article)
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
            return {
                ...state,
                articles: state.articles.filter(post => post.article_id !== payload.id)
            }
        default: 
            return state;
    }
    
}