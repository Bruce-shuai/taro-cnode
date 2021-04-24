import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';
// import {getTopicList} from '../../utils/request';
import Menu from '../../components/menu/menu';   // 注意，引用的名称要相等 
import Topiclist from '../../components/topiclist/topiclist';   
class Index extends Component {
  // 页面最顶层的文字
    config = {
    navigationBarTitleText: '首页'
  }

  // 这个生命周期函数式在已经装载的组件接受到新属性前调用
  componentWillReceiveProps (nextProps) {
    console.log('nextProps？' +  this.props, nextProps)
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

  // 这里相当于是首页渲染逻辑
  render() {
    return (
      <View className='index'>
        {/* 首页的顶部 --> 其实就两个图片 + 一个标题*/}
        <Menu />      {/* 该组件没有网络请求 */}
        {/* 首页的内容 */}
        <Topiclist /> {/* 该组件内容和Menu组件的currentCata数据有关系 */}
      </View>
    )
  }
}

export default Index
