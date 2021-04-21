import {getJSON, postJSON} from '../utils/request';
import api from '../constants/api';

// 请求首页数据,  这就是一个中间件，不会一来就传给store，而是会等待
export function getTopicList(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopics, params)
    if (result && result.data) {
      if (result.data.success) {
        // 这才是真正要传递给store的数据
        dispatch({type: 'getTopicList', list: result.data.data})
      }
    }
  }
}
// 请求下页数据
export function getNextList(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopics, params)
    if (result && result.data) {
      if (result.data.success) {
        if (result.data.data.length > 0) {
          dispatch({type: 'appendTopicList', list: result.data.data, page: params.page})
        }
      }
    }
  }
}
// 请求话题详情
export function getTopicInfo(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopicinfo + params.id, params)
    if (result && result.data && result.data.success) {
      dispatch({type: 'getTopicInfo', infoData: result.data.data})
    } else {
      // 这个console的用法有点意思，可以看看有没有更多的console方法
      console.error('请求话题详情失败！');
    }
  }
}