import {getTopicList} from './topiclist';

// 显示抽屉 --> 不需要接口进行网络请求。所以就普通的传一个对象就行
export function showDrawer() {
  return dispatch => {
    dispatch({type: 'showDrawer'})
  }
}

// 切换当前分类
export function changeCata(cata){
  return dispatch => {
    dispatch({type: 'changeCata', currentCata:cata })
    // 厉害，还可以再写dispatch，而且是传递给topic的reducer里去
    dispatch(getTopicList({tab:cata.key, page: 1, limit: 20}))
  }
}

// 隐藏抽屉
export function hideDrawer() {
  return dispatch => {
    dispatch({type: 'hideDrawer'})
  }
}