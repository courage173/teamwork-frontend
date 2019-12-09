import {POST_CATEGORIES,EDIT_CATEGORIES,GET_ALL_CATEGORIES,GET_SINGLE_CATEGORIES,DELETE_CATEGORIES} from '../types';
import api from '../api'


//Create category
export const postCatgories = (payload) => ({
    type: POST_CATEGORIES,
    payload
})

export const postCat = (data) => {
    return dispatch => api.user.postCatgory(data).then(payload => dispatch(postCatgories(payload))) 
}

//edit category
export const editCatgories = (payload) => ({
    type: EDIT_CATEGORIES,
    payload
})

export const editCat = (id,data) => {
    return dispatch => api.user.editCatgory(id,data).then(payload => dispatch(editCatgories(payload))) 
}

//get all category
export const getAllCatgories = (payload) => ({
    type: GET_ALL_CATEGORIES,
    payload
})

export const getAllCat = () => {
    return dispatch => api.user.getAllCat().then(payload => dispatch(getAllCatgories(payload))) 
}

//get Single category
export const getSingleCatgories = (payload) => ({
    type: GET_SINGLE_CATEGORIES,
    payload
})

export const getSingleCat = () => {
    return dispatch => api.user.getSingleCat().then(payload => dispatch(getSingleCatgories(payload))) 
}

//delete category
export const deleteCatgories = (payload) => ({
    type: DELETE_CATEGORIES,
    payload
})

export const deleteCatgory = (id) => {
    return dispatch => api.user.deleteCat(id).then(payload => dispatch(deleteCatgories(payload))) 
}