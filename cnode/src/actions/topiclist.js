import {getJSON, postJSON} from '../utils/request';
import api from '../constants/api';
import Taro from '@tarojs/taro';

// 请求首页数据,  这就是一个中间件，不会一来就传给store，而是会等待
export function getTopicList(params) {
  // 因为这里需要异步请求，就用async-await了，其实也就比普通的dispatch多了这个异步请求操作，可以和menu的action做比较
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
// 请求下页数据  --> 这个和上面的请求首页都差不多！只是多了个page
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
// 点赞话题回复
export function admireTopic(params) {
  return async dispatch => {
    // console.log('id：' + params.replyid);
    let result = await postJSON(api.upreply + params.replyid + '/ups', params);
    if (result && result.data && result.data.success) {
      // 点赞成功
      dispatch({type: 'admireSuccess'})
    } else {
      // 点赞失败, 这个弹出功能是Taro自己提供的
      Taro.showToast({title: '点赞失败', icon: 'none'})
    }
  }
}

export async function replyContent(params) {
  let result = await postJSON(api.replyTopic + params.topicid + '/replies', params)
  if (result && result.data && result.data.success) {
    // 成功评论
    return result.data;
  } else {
    // 评论失败
    Taro.showToast({title: '评论失败', icon: 'none'})
  }
  return false;
}

export async function submitTopic(params) {
  let result = await postJSON(api.createtopic, params)
  if (result && result.data && result.data.success) {
    return result.data;
  } else {
    Taro.showToast({title: '发布话题失败', icon: 'none'})
  }
  return false;
}