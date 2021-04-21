import Taro, {Component} from '@tarojs/taro';
import {View, Image} from '@tarojs/components';
import {myTimeToLocal} from '../../utils/date'
import './topic.less';
// 这里就着重讲页面跳转
class Topic extends Component {
  // 跳转到详情页
  goToDetail = (topic) => {
    // taro 提供了一个路由跳转的方法： navigateto, 第一个参数是相对路径
    // 注意： navigateTo不能频繁的使用，似乎不能跳转5层,而Taro.redirectTo(option)似乎可以多级嵌套
    // 传递参数：
    Taro.navigateTo({url:'/pages/detail/index?topicid=' + topic.id});
  }

  render() {
    // 这里的this.props 是从组件 topiclist.js 里的数据里获取的，这里主要是普通的样式设置，重点在路由跳转到topicinfo组件！
    let {item} = this.props;
    return <View className='topiclist-topic' onClick={() => this.goToDetail(item)}>
      <Image className='head-img' src={item.author?item.author.avatar_url: ''} />
      <View className='right'>
        <View className='topic-title'></View>
        {/* 这种嵌套三元运算符厉害 */}
        {item.top ? <Text className='topic-up orange'>置顶</Text> : (item.top == 'share' ? <Text className='topic-up blue'>分享</Text> : <Text className='topic-up blue'>问答</Text>)}
          <Text>{item.title}</Text>
        <View className='topic-info'>
          <Text>{item.author ? item.author.loginname: ''}</Text>
          <Text>{item.reply_count + '/' + item.visit_count}</Text>
          <Text>创建时间:{myTimeToLocal(item.create_at)}</Text>
        </View>
      </View>
    </View>
  }   
}
export default Topic;