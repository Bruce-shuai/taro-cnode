const TOPIC_STATE = {   // 这里的数据应该是感觉api的文档和自己实际组件是否需要来写的
  page: 1,
  limit: 20,
  list: [],             // 用来接收每个用户发出的信息
  topicinfo:{},
  replies:[],
  admireState: false    // 点赞状态
}
export default function topiclist(prestate=TOPIC_STATE, action) {
  switch(action.type) {
    case 'admireSuccess':
      return {...prestate, admireState: !prestate.admireState}
    case 'getTopicInfo':  // topicinfo不要replies所使用的方法好啊！！
      return {...prestate, replies: action.infoData.replies, topicinfo: {...action.infoData, replies: null}}
    case 'getTopicList':
      return {...prestate, list: action.list, page: 1}
    case 'appendTopicList':
      // 这里的concat用得好啊！
      return {...prestate, list: prestate.list.concat(action.list), page: action.page}
    default:
      return {...prestate}
  }
}