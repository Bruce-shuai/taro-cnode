import Taro, {Component} from '@tarojs/taro';
import {View, Image, Text, RichText} from '@tarojs/components';
import {myTimeToLocal} from '../../utils/date';
import {connect} from '@tarojs/redux';
import './replies.less';
// 写这个的目的是什么呢？  似乎要报错
// const isweapp = process.env.TARO_NEV == 'weapp';  // 小程序
class Replies extends Component {
  render() {
    let {replies} = this.props;
    // console.log(replies);
    return <View className='topicinfo-replies'>
      {
        replies.map((item, index) => {
          return <View key={item.id} className='topicinfo-repliy'>
            <Image className='topicinfo-repliy-image' src={item.author?item.author.avatar_url:''}/>
            <View className='topicinfo-repliy-right'>
            <View className='topicinfo-repliy-right-body'>
              <View className='topicinfo-repliy-right-pie'>
                <Text className='loginname'>{item.author?item.author.loginname:''}</Text>
                <Text className='floor'>{(index + 1) + '楼'}</Text>
                <Text className='time'>{myTimeToLocal(item.create_at)}</Text>
              </View>
              <View className='topicinfo-repliy-right-content'>
                {
                  // dangeroutlySetInnerHTML 这是什么意思？
                  // isweapp ? <RichText nodes={item.content} /> : <View dangeroutlySetInnerHTML={{__html:item.content}}></View>
                  <RichText nodes={item.content} />
                }
              </View>
            </View>
            <View className='topicinfo-repliy-right-zan'>
              <Image className='topicinfo-repliy-image' src={require('../../assets/img/zan.png')}/>
                <Text>0</Text>    
              <Image className='topicinfo-repliy-image' src={require('../../assets/img/zhuan.png')}/>
            </View>
            </View>
          </View>
        })
      }
    </View>
  }
}
export default Replies;