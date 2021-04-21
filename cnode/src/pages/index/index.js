import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';
// import {getTopicList} from '../../utils/request';
import Menu from '../../components/menu/menu';   // 注意，引用的名称要相等 
import Topiclist from '../../components/topiclist/topiclist';   
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



    // // 在DidMount生命周期执行这个是最好的！！
    // // 因为返回的是一个Promise对象，所以仍然可以进行链式调用
    // getTopicList().then(data => {
    //   console.log('取到的数据：' + data);
    // });     
  }
  // 这里相当于是首页
  render () {
    return (
      <View className='index'>
        <Menu />
        <Topiclist />
      </View>
    )
  }
}

export default Index
