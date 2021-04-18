import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './index.less'
import {getTopicList} from '../../utils/request';

class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount() {
    // 在DidMount生命周期执行这个是最好的！！
    getTopicList();     
  }
  render () {
    return (
      <View className='index'>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
