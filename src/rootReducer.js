import {combineReducers} from 'redux'
import user from './reducers/user'
import userAction from './reducers/userAction'


export default combineReducers({
    user,
    userAction
})