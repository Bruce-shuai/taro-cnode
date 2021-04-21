import Taro, {Component} from '@tarojs/taro';
import {View, Input, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Head from '../../components/head/head';
import './login.less';
class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  render() {
    return <View className='login-body'>
      <Head />
      <View className='form'>
        <Input className='access_input' placeholder='请输入accesstoken' />
        <Button className='btn_login'>登录</Button>
      </View>
    </View>
  }
}
export default Login;