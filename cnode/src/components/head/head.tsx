import Taro, {Component} from '@tarojs/taro';
import {View, Image, Text} from '@tarojs/components';
import {IHeadProps} from '../../interface/IHead';
import './head.less';

// 注意：props是通过构造函数传入而来的，所以要给Component传入接口
class Head extends Component<IHeadProps, {}> {
  render() {
    // this.props数据是在哪获得的？ 这里的数据是从User里面获得的
    let {loginname, avatar_url} = this.props;
    return <View className='login-head'>
      {/* 似乎相对路径和绝对路径都是可以使用的 */}
      <Image className='login-head-background' src={require('../../assets/img/loginBack.jpg')} />
      {/* 这里的avatar_url是不需要require的吗？ */}
      <Image className='login-head-head' src={avatar_url ? avatar_url : require('../../assets/img/head.png')} />
      {loginname ? <Text className='login-head-name'>{loginname}</Text> : null}
    </View>
  }
}
export default Head;