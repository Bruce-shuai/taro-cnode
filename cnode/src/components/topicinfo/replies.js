import Taro, {Component} from '@tarojs/taro';
import {View, Image, Text, RichText} from '@tarojs/components';
import {myTimeToLocal} from '../../utils/date';
import './replies.less';
import {validateUser} from '../../actions/user';
// 写这个的目的是什么呢？  似乎要报错
// const isweapp = process.env.TARO_NEV == 'weapp';  // 小程序
class Replies extends Component {
  admire = (reply) => {
    let {user} = this.props;
    validateUser(user).then(result => {
      if (result) {
        // 这里必须要用on开头...
        this.props.onAdmire&&this.props.onAdmire(reply);
      } else {
        Taro.navigateTo({url: '/pages/login/login'})
      }
    })
  }
  replyToReply = (reply) => {
    let {user} = this.props;
    validateUser(user).then(result => {
      if (result) {
        this.props.onReplyToReply && this.props.onReplyToReply(reply);
      } else {
        Taro.navigateTo({url: '/pages/login/login'})
      }
    })
  }
  render() {
    let {replies} = this.props;
    // console.log(replies);
    return <View className='topicinfo-replies'>
      {
        replies.map((item, index) => {
          // console.log('item:' + item.is_uped);
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
            {/* 点赞区 */}
            <View className='topicinfo-repliy-right-zan'>
              {/* ！！！onClick 传参item和不传item，对于admire里的item有什么影响呢？
              估计这里应该不传参，如果有参数的话应该是包围这个回调的高阶函数提供对应的参数 */}
              <Image onClick={() => this.admire(item)} className='topicinfo-repliy-image' src={item.is_uped ? require('../../assets/img/myzan.png'):require('../../assets/img/zan.png')}/>
                <Text>{item.ups.length}</Text>    
              <Image onClick={() => this.replyToReply(item)} className='topicinfo-repliy-image' src={require('../../assets/img/zhuan.png')}/>
            </View>
            </View>
          </View>
        })
      }
    </View>
  }
}
export default Replies;