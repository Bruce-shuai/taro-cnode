import { combineReducers } from 'redux'
import menu from './menu';
import topiclist from './topic';
import user from './user';


//  combineReducers的用法是什么？
export default combineReducers({
  menu, 
  topiclist,
  user,
})
