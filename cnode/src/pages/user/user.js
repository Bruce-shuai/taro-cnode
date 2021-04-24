import Taro, {Component} from '@tarojs/taro';
import {View, Text, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Head from '../../components/head/head';
import Panel from '../../components/user/panel';
import { getUserInfo } from '../../actions/user';
import './user.less';

@connect(function(store){
  return {...store.user}
})

class User extends Component {
  state = {
    recent_topics: [],
    recent_replies: []
  }
  componentWillMount() {
    // 这里为什么没有使用dispatch？
    getUserInfo({loginname: this.props.loginname}).then(result => {
      this.setState({
        recent_topics: result.data.recent_topics, 
        recent_replies: result.data.recent_replies
      })
    })
  }
  publishTopic = () => {
    // web while是什么？
    // 这里不能用navigateTo, 只能使用redirectTo
    Taro.redirectTo({url:'/pages/publish/publish'})
  }
  render() {
    let {loginname, avatar_url} = this.props;
    let {recent_replies, recent_topics} = this.state;
    return <View>
      {/* 这里的Head就和login的Head不一样啦！ */}
      <Head loginname={loginname} avatar_url={avatar_url}></Head>
      {/* 这里才用同名的方法，可以学习学习 */}
      <Panel listData={recent_topics} title='最近发布的话题' />
      <Panel listData={recent_replies} title='最近收到的回复' />
      <Button className='publish_button' onClick={this.publishTopic}>发布话题</Button>
    </View>
  }
}
export default User;