import Taro, {Component} from '@tarojs/taro';
import {Button, View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {getTopicInfo, admireTopic, replyContent} from '../../actions/topiclist';
import TopicInfo from '../../components/topicinfo/topicinfo';
import Replise from '../../components/topicinfo/replies';
import ReplyContent from '../../components/topicinfo/replycontent';
import {validateUser} from '../../actions/user';
import './detail.less';
// 这些页面主要是用来组合组件来显示内容的, 页面放逻辑，组件放渲染

// 相当于connect提供了所有的state和dispatch
// 这里的topicinfo数据是哪来的？
@connect(function(store){
  return {
    admireState: store.topiclist.admireState, 
    user: store.user, 
    topicinfo: store.topiclist.topicinfo, 
    replies: store.topiclist.replies
  }
}, function(dispatch){
  return {
    getTopicInfo(params) {
      dispatch(getTopicInfo(params))
    }, 
    admireTopic(params) {
      dispatch(admireTopic(params))
    }
  }
})

class Detail extends Component {
  config={
    navigationBarTitleText: '话题详情'
  }

  // 请问，在constructor中定义state和在static中定义state有什么区别？ 似乎static只能通过类名调用方法, 直接写state
  // static state = {
  //   showReplyContent: true  
  // }
  state = {
    showReplyContent: false  // 显示回复组件 默认是false
  }

  // 监听程序初始化，初始化完成时触发（全局只触发一次)
  componentWillMount() {
    this.getDetail();
  }
  // ************ 之后可以试试把这个函数变成箭头函数 ***********
  getDetail() {
    let {user} = this.props;
    // this.$router.params 是获取之前传递的参数， 见路径 components/topiclist/topic.js， mdrender是自己设置的属性  
    let params = {id: this.$router.params.topicid, mdrender: true, accesstoken: user.accesstoken}
    // 这个方法是用来
    this.props.getTopicInfo && this.props.getTopicInfo(params);  // 这个一旦执行，store的数据就会更新
    // 这是一个什么用法？ 为什么要这样用呢？为什么要用在componentWillMount里面？
    // 这是页面路由吗？
    // console.log(this.$router.params.topicid);   // 估计是用来定位当前页面的
  }
  admire = reply => {
    let {user} = this.props;
    // console.log('reply.id:' + reply.id);
    let params = {replyid:reply.id, accesstoken: user.accesstoken}
    // console.log('赞赏');
    // console.log('admire:' + );
    // 注意：这里是this.props 而不是 this.
    this.props.admireTopic && this.props.admireTopic(params);
  }
  // 这个生命周期要搞清楚是什么意思
  componentWillReceiveProps(nextProps) {
    if (this.props.admireState != nextProps.admireState) {
      // 发生改变， 请求数据
      this.getDetail(); 
    }
  }
  reply = () => {
    validateUser(this.props.user).then(result => {
      if (result) {
        this.setState({
          showReplyContent: true
        })
      } else {
        Taro.navigateTo({url: '/pages/login/login'})
      }
    })
  }
  closeReplyContent = () => {
    this.setState({
      showReplyContent: false
    })
  }
  // 给指定用户回复信息的具体内容
  replyContentValue = (content) => {
    // arguments
    // console.log('content: ' + content);
    // 获取了子组件传递的内容
    let value = content;
    let {user} = this.props;
    let {currentReply} = this.state;  // 这里算是给this.state增加了新的属性吗？
    let reply_id = currentReply ? currentReply.id : null;
    let preName = currentReply ? '@' + currentReply.author.loginname  + ' ': ''; // 评论人的昵称
    let params = {reply_id: reply_id, content: preName + value, accesstoken:user.accesstoken, topicid: this.$router.params.topicid};
    // 这里的replyContent应该是用的action里的replyContent
    replyContent(params).then(result => {
      // 这种result.success用法是啥？  success应该是自带的， success返回的是布尔值
      if (result.success) {
        this.getDetail();
        this.closeReplyContent();
      }
    })
  }
  // 提供给子组件使用的函数, 这里的reply是从哪儿获得的？？  ---> 求解
  replyToReply = (reply) => {
    this.setState({currentReply: reply, showReplyContent: true})
  }


  render() {
    // 一定非要在render里解构this.props?
    let {topicinfo, replies, user} = this.props;
    let {showReplyContent} = this.state;
    return (<View className='detail'>
      {/* 在replyContent用state，不需要使用redux，因为该组件的效果就是只在当前页面有效，没必要使用redux */}
      {/* ReplyContent: 给指定用户回复信息 */}
        {
          showReplyContent ? <ReplyContent 
          onOkReplyContent={this.replyContentValue} 
          onCancelReplyContent={this.closeReplyContent}/> : null
        }
        {/* <ReplyContent /> */}
        {/* TopicInfo: 展示指定用户发的具体信息 */}
        <TopicInfo topicinfo={topicinfo}/>
        {/* Replise: 展示指定用户获得的评论 */}
        <Replise 
          user={user}
          replies={replies} 
          onAdmire={this.admire}
          onReplyToReply = {this.replyToReply}
        />
        {/* Button: 给指定用户回复信息的按钮 */}
        <Button className='replyBtn' onClick={this.reply}>回复</Button>
      </View>)
  }
}

export default Detail;