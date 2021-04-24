import Taro, {Component} from '@tarojs/taro';
import {View, Input, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Head from '../../components/head/head';
// 这个函数非常重要！ 获取用户信息
import {accessUserToken} from '../../actions/user';
import './login.less';

@connect(
  function(store){
    return {user: store.user}
  }, 
  function(dispatch){
    return {
      accessUserToken(params) {
      // 这里要加个return， 不然then拿不到，这里要好好想想
      return dispatch(accessUserToken(params))
    }
  }
})

class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  changeToken = (e) => {
    if (e && e.target) {
      // console.log(e.target.value);  这里的这个token 没必要发送到全局去
      this.setState({token: e.target.value})
    }
  }
  // 验证token， 这里需要redux，因为token可是全局管理
  loginToken = () => {
    if (this.state.token) {
      if (this.props.accessUserToken) {
        this.props.accessUserToken({accesstoken: this.state.token}).then(result => {
          // 不能频繁的使用navigate，这里不需要返回登录页了，所以用的是redirectTo
          Taro.redirectTo({url: '/pages/user/user'})
        })
      }
    } else {
      Taro.showToast({title: '请输入秘钥再进行登录验证'})
    }
  }
  render() {
    return <View className='login-body'>
      <Head />
      <View className='form'>
        <Input onInput={this.changeToken} className='access_input' placeholder='请输入accesstoken' />
        <Button onClick={this.loginToken} className='btn_login'>登录</Button>
      </View>
    </View>
  }
}
export default Login;