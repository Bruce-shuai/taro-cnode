import Taro, {Component} from '@tarojs/taro';
import {View, Text, RichText, Image} from '@tarojs/components';
import './topicinfo.less';
import {myTimeToLocal} from '../../utils/date';

class TopicInfo extends Component {
  delTopic(topicinfo) {
    this.props.onDelTopic && this.props.onDelTopic(topicinfo);
  }
  // 编辑话题
  editTopic(topicinfo) {
    // 不能使用navigateTo，因为不能刷新，这样保存就没用用处了，这里要多想想
    Taro.redirectTo({url: '/pages/publish/publish?edit=1'});  // 这里要想想为什么要加参数！
  }
  render() {
    let {topicinfo, selfPublish} = this.props;

    return <View className='topic-info'>
      <View className='topic-info-header'>
        <View className='topic-info-header-title'>
          {/* <Text>置顶</Text> */}
          {/* 这个top是在哪儿获得的？？求解？ 是通过网络请求获得的 */}
          {
            // 说实话，这个嵌套三元运算符用得太好了！
            topicinfo.top ? <Text className='topic-up orange'>置顶</Text> : 
            (topicinfo.tab == 'share' ? <Text className='topic-up blue'>分享</Text> : 
            <Text className='topic-up blue'>问答</Text>)
          }
          <Text>{topicinfo.title}</Text> 
        </View>
        <View className='topic-info-header-pie'>
          <Text>{myTimeToLocal(topicinfo.create_at)}</Text>
          {/* 这个三元运算符用来防错是很好的！ */}
          <Text>{topicinfo.author?topicinfo.author.loginname:''}</Text>
          <Text>{topicinfo.visit_count?topicinfo.visit_count + '次浏览':''}</Text>
          {/* <Text>{}</Text> */}
        </View>
        {
          selfPublish?<View className='topic-info-header-img'>
          <Image onClick={() => this.delTopic(topicinfo)} className='img' src={require('../../assets/img/del.png')}/>
          <Image onClick={() => this.editTopic(topicinfo)} className='img' src={require('../../assets/img/edit.png')}/>
        </View>: null
        }
        
      </View>
      <View className='topic-info-body'>
        {/* 这里要使用Taro自带组件 RichText来实现富文本 */}
        {/* 卧槽，这个还可以显示图片 */}
        {/* RichText 富文本 */}
        <RichText nodes={topicinfo.content} />
      </View>
    </View>
  }
}

// 这一步的用处是什么呢？
// defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。
// 这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用
TopicInfo.defaultProps ={
  topicinfo: {}
}
export default TopicInfo;