import Taro, {Component} from '@tarojs/taro';
import {View, Text, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Head from '../../components/head/head';
import Panel from '../../components/user/panel';
import { getUserInfo } from '../../actions/user';


@connect(function(store){
  return {...store.user}
})

class User extends Component {
  componentWillMount() {
    
  }
  render() {
    let {loginname, avatar_url} = this.props;
    return <View>
      <Head loginname={loginname} avatar_url={avatar_url}></Head>
      <Panel />
      <Panel />
    </View>
  }
}
export default User;