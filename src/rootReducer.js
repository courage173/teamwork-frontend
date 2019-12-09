import {combineReducers} from 'redux'
import user from './reducers/user'
import userAction from './reducers/userAction'
import articles from './reducers/articleReducer'
import categories from './reducers/categoryReducer'


export default combineReducers({
    user,
    userAction,
    articles,
    categories
})