import { POST_GIFS,GET_ALL_GIFS,GET_SINGLE_GIFS,DELETE_GIFS,POST_GIF_COMMENT} from '../types'


export default function userAction(state={}, action={}){
    const { type, payload } = action
    switch(type){
        
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
                gifs: state.userAction.filter(post => post.gif_id !==payload)
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