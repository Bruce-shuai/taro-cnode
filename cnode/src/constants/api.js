const rootPath='https://cnodejs.org/api/v1';
// 这一招真的厉害~
const apiObject={
  gettopics: rootPath + '/topics',   // 获取话题列表 
  gettopicinfo:rootPath + '/topic',  // 获取话题详情
  checkusertoken: rootPath + '/accesstoken', // 验证用户token
  getuserinfo: rootPath + '/user/',  // 获取用户信息
  createtopic: rootPath + '/topics', // 新建话题
  replyTopic: rootPath + '/topic',   // 回复话题消息<-->注意动态信息问题
  upreply: rootPath + 'reply',       // 点赞
}

export default apiObject;