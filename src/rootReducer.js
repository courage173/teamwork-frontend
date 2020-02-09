import {combineReducers} from 'redux'
import user from './reducers/user'
import userAction from './reducers/userAction'
import articles from './reducers/articleReducer'
import categories from './reducers/categoryReducer'
import comments from './reducers/commentReducer'


export default combineReducers({
    user,
    userAction,
    articles,
    categories,
    comments
})