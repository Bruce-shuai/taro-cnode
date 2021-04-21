import Taro, {Component} from '@tarojs/taro';
import {View, Image} from '@tarojs/components';
import './head.less';

class Head extends Component {
  render() {
    return <View className='login-head'>
      <Image className='login-head-background' src={require('../../assets/img/loginBack.jpg')} />
      <Image className='login-head-head' src={require('../../assets/img/head.png')} />
    </View>
  }
}
export default Head;