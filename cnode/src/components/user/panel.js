import Taro, {Component} from '@tarojs/taro';
import {View, Image} from '@tarojs/components';
import './panel.less';
import {myTimeToLocal} from '../../utils/date';
class Panel extends Component {
  toDetail = (item) => {
    // 注意这里的参数！
    Taro.navigateTo({url: '/pages/detail/index?topicid=' + item.id})
  }
  render() {
    let {listData, title} = this.props;
    return <View className='topic-panel'>
      <View className='topic-panel-title'>
        {title}
      </View>
      {
        listData.map((item) => {
          // 话题详情页面跳转
          return <View onClick={() => this.toDetail(item)} className='topic-panel-list' key={item.id}>
            <Image className='topic-panel-list-img' src={item.author.avatar_url}/>
            {/* 超出部分内容隐藏 */}
            <Text className='topic-panel-list-title'>{item.title}</Text>
            <Text className='topic-panel-list-date'>{myTimeToLocal(item.last_reply_at)}</Text>
          </View>
        })
      }
    </View>
  }
}
export default Panel;