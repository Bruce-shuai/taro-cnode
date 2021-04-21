import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {getTopicInfo} from '../../actions/topiclist';
import TopicInfo from '../../components/topicinfo/topicinfo';
import Replise from '../../components/topicinfo/replies';
// 这些页面主要是用来组合组件来显示内容的

// 相当于connect提供了所有的state和dispatch
// 这里的topicinfo数据是哪来的？
@connect(function(store){
  return {topicinfo: store.topiclist.topicinfo, replies: store.topiclist.replies}
}, function(dispatch){
  return {getTopicInfo(params) {
    dispatch(getTopicInfo(params))
  }}
})
class Detail extends Component {
  config={
    navigationBarTitleText: '话题详情'
  }
  // 监听程序初始化，初始化完成时触发（全局只触发一次)
  componentWillMount() {
    // this.$router.params 是获取之前传递的参数， 见路径 components/topiclist/topic.js， mdrender是自己设置的属性  
    let params = {id: this.$router.params.topicid, mdrender: true}
    // 这个方法是用来
    this.props.getTopicInfo && this.props.getTopicInfo(params);
    // 这是一个什么用法？ 为什么要这样用呢？为什么要用在componentWillMount里面？
    // 这是页面路由吗？
    // console.log(this.$router.params.topicid);   // 估计是用来定位当前页面的
  }
  render() {
    // 一定非要在render里解构this.props?
    let {topicinfo, replies} = this.props;
    return (<View>
        <TopicInfo topicinfo={topicinfo}/>
        <Replise replies={replies}/>
      </View>)
  }
}

export default Detail;