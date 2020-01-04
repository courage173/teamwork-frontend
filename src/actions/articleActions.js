import {POST_ARTICLES,EDIT_ARTICLES,GET_SINGLE_ARTICLES,
    GET_ALL_ARTICLES,GET_CAT_ARTICLES,
    POST_ARTICLE_COMMENT,DELETE_ARTICLES, GET_USER_ARTICLES} from '../types';
import {feeds} from './userAction'
import api from '../api'


//articles post
export const postArt = (payload) => ({
    type: POST_ARTICLES,
    payload
})

export const postArticles = (title,article,flagged,category) => {
    return dispatch => api.user.postArticle(title,article,flagged,category).then(payload =>{
        dispatch(postArt(payload))
    })
    
}
//edit articles
export const editArt = (payload) => ({
    type: EDIT_ARTICLES,
    payload
})

export const editArticles = (article_id,title,article,flagged,category) => {
    return dispatch => api.user.editArticle(article_id,title,article,flagged,category).then(payload => dispatch(editArt(payload))) 
}

//get single article
export const getSingleArt = (payload) => ({
    type: GET_SINGLE_ARTICLES,
    payload
})

export const getSingleArticles = (article_id) => {
    return dispatch => api.user.getSingleArticle(article_id).then(payload => dispatch(getSingleArt(payload))) 
}

//get All articles
export const getAllArt = (payload) => ({
    type: GET_ALL_ARTICLES,
    payload
})

export const getAllArticles = () => {
    return dispatch => api.user.getAllArticle().then(payload => dispatch(getAllArt(payload))) 
}

//get All articles in a category
export const getCatArt = (payload) => ({
    type: GET_CAT_ARTICLES,
    payload
})

export const getCatArticles = (catId) => {
    return dispatch => api.user.getCatArticle(catId).then(payload => dispatch(getCatArt(payload))) 
}
//get articles by a particular user
export const getUserArt = (payload) => ({
    type: GET_USER_ARTICLES,
    payload
})

export const getUserArticles = (userId) => {
    return dispatch => api.user.getUserArticle(userId).then(payload => dispatch(getUserArt(payload))) 
}

//post article comment
export const postArtComment = (payload) => ({
    type: POST_ARTICLE_COMMENT,
    payload
})

export const postArticleComment = (article_id,data) => {
    return dispatch => api.user.postComment(article_id,data).then(payload => dispatch(postArtComment(payload))) 
}
//Delete article
export const deleteArticles = (payload) => ({
    type: DELETE_ARTICLES,
    payload
})

export const deleteArt = (article_id) => {
    return dispatch => api.user.deleteArticle(article_id).then(payload => dispatch(deleteArticles(payload))) 
}