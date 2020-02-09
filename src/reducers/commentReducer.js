import {GET_ARTICLE_COMMENT,POST_ARTICLE_COMMENT,GET_GIF_COMMENT,
    POST_GIF_COMMENT,DELETE_ARTICLES_COMMENT,DELETE_GIF_COMMENT} from '../types'


export default function comments(state=[], action={}){
    const {payload,type} = action 
    switch(type){
        case POST_ARTICLE_COMMENT:
                return {
                    ...state,
                    comments: [payload.data, ...state.comments]
                }
            case  GET_ARTICLE_COMMENT: 
                return {
                    ...state,
                    comments: payload
                }
            case DELETE_ARTICLES_COMMENT:
                   let index = state.comments.findIndex(
                        (post) => post.comment_id === payload.data
                      );
                      state.comments.splice(index, 1);
                      return {
                        ...state
                      };
                   
            case POST_GIF_COMMENT:
                    return {
                    ...state,
                    comments: [payload.data, ...state.comments] 
                    }
            case GET_GIF_COMMENT:
                return {
                    ...state,
                    comments: payload
                }
            case DELETE_GIF_COMMENT:
                     const inde = state.comments.findIndex(
                        (post) => post.comment_id === payload.data
                      );
                      state.comments.splice(inde, 1);
                      return {
                        ...state
                      };
        default:
            return state
    }
}