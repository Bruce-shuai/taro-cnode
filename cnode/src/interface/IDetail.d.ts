interface IUser {
  accesstoken: string;
  [propName: string]:any;
}
// 这是函数类型的接口
interface IGetTopicInfo {
  (params: any):void
}
interface IAdmireTopic {
  (params: any):void
}
interface ITopicInfo {
  id: string,
  author_id: string,
  content: string,
  title: string,
  good: boolean,
  reply_count: number,
  [propsName: string]:any
}
interface IReply {
  id: string,
  content: string,
  is_uped: boolean,
  [propName: string]:any
}
export interface IDetailProps {
  user: IUser,
  admireState?: boolean,
  admireTopic: IAdmireTopic,
  getTopicInfo: IGetTopicInfo,
  topicinfo: ITopicInfo,
  replies: Array<IReply>
}
export interface IDetailState {
  showReplyContent: boolean,
  currentReply?: any
}