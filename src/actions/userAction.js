import {GET_ALL_FEEDS, POST_GIFS,GET_ALL_GIFS,GET_SINGLE_GIFS,DELETE_GIFS,
    POST_GIF_COMMENT,GET_GIF_COMMENT,DELETE_GIF_COMMENT} from '../types';
import api from '../api'
//all feeds
export const getAllFeeds = (payload) => ({
    type: GET_ALL_FEEDS,
    payload
})

//handle gifs
export const postGifs = (payload) => ({
    type: POST_GIFS,
    payload
})

export const getAllGifs = (payload) => ({
    type: GET_ALL_GIFS,
    payload
})

export const getSingleGif = (payload) => ({
    type: GET_SINGLE_GIFS,
    payload
})

export const deleteGifs = (payload) => ({
    type: DELETE_GIFS,
    payload
})
export const postGifscomment = (payload) => ({
    type: POST_GIF_COMMENT,
    payload
})

export const getGifscomment = (payload) => ({
    type: GET_GIF_COMMENT,
    payload
})

export const deleteGifscomment = (payload) => ({
    type: DELETE_GIF_COMMENT,
    payload
})


//logic to handle api call
export const feeds = () => {
    return dispatch => api.user.feeds().then(payload => dispatch(getAllFeeds(payload)))
}

export const postGif = (image,title) => {
    return dispatch => api.user.postGif(image,title).then(payload => {
        dispatch(postGifs(payload))
        dispatch(feeds())
    })
}

export const getAllGif = () => {
    return dispatch => api.user.getAllGif().then(payload => dispatch(getAllGifs(payload)))
}

export const getSingleGifs = (id) => {
    return dispatch => api.user.getSingleGif(id).then(payload => dispatch(getSingleGif(payload)))
}

export const deleteGif = (id) => {
    return dispatch => api.user.deleteGif(id).then(payload => dispatch(deleteGifs(payload)))
}

export const postGifComments = (id,data) => {
    return dispatch => api.user.postGifComment(id,data).then(payload => dispatch(getGifComment(id)))
}

export const getGifComment = (gif_id) => {
    return dispatch => api.user.getGifComment(gif_id).then(payload => dispatch(getGifscomment(payload.data)))
}

export const deleteGifComments = (commentId) => {
    return dispatch => api.user.deleteGifComment(commentId).then(payload => dispatch(deleteGifscomment(payload)))
}





