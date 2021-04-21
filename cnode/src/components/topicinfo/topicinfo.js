import Taro, {Component} from '@tarojs/taro';
import {View, Text, RichText} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './topicinfo.less';
import {myTimeToLocal} from '../../utils/date';
// 我草，有好多的接口
class TopicInfo extends Component {
  render() {
    let {topicinfo} = this.props;
    return <View className='topic-info'>
      <View className='topic-info-header'>
        <View className='topic-info-header-title'>
          {/* <Text>置顶</Text> */}
          {/* 这个top是在哪儿获得的？ */}
          {topicinfo.top ? <Text className='topic-up orange'>置顶</Text> : (topicinfo.top == 'share' ? <Text className='topic-up blue'>分享</Text> : <Text className='topic-up blue'>问答</Text>)}
          <Text>{topicinfo.title}</Text> 
        </View>
        <View className='topic-info-header-pie'>
          <Text>{myTimeToLocal(topicinfo.create_at)}</Text>
          {/* 这个三元运算符用来防错是很好的！ */}
          <Text>{topicinfo.author?topicinfo.author.loginname:''}</Text>
          <Text>{topicinfo.visit_count?topicinfo.visit_count + '次浏览':''}</Text>
          {/* <Text>{}</Text> */}
        </View>
      </View>
      <View className='topic-info-body'>
        {/* 这里要使用Taro自带组件 RichText来实现富文本 */}
        {/* 卧槽，这个还可以显示图片 */}
        <RichText nodes={topicinfo.content} />
      </View>
    </View>
  }
}
TopicInfo.defaultProps ={
  topicinfo: {}
}
export default TopicInfo;