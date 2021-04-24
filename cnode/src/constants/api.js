const rootPath='https://cnodejs.org/api/v1';
// 这一招真的厉害~
const apiObject={
  // 注意：文档里的api get post是不写在路径上的。 比如： get /topics 主题首页   只写 /topics
  gettopics: rootPath + '/topics',           // 获取话题列表 
  gettopicinfo:rootPath + '/topic/',         // 获取话题详情
  checkusertoken: rootPath + '/accesstoken', // 验证用户token
  getuserinfo: rootPath + '/user/',          // 获取用户信息
  createtopic: rootPath + '/topics',         // 新建话题
  replyTopic: rootPath + '/topic/',          // 回复话题消息<-->注意动态信息问题
  upreply: rootPath + '/reply/',             // 点赞
  updatetopic:rootPath+'/topics/update'      //更新主题
}

export default apiObject;