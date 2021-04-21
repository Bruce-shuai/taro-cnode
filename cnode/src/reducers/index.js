import { combineReducers } from 'redux'
import menu from './menu';
import topiclist from './topic';

//  combineReducers的用法是什么？
export default combineReducers({
  menu, 
  topiclist
})
