import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'
import configStore from './store'
// 这一个引用是有什么用呢？
import '@tarojs/async-await'
import './app.less'

const store = configStore()

class App extends Component {

  config = {
    // 这是所有的路由，增加路由也是在这里增加
    pages: [
      'pages/index/index',    // 主题首页
      'pages/detail/index',   // 主题详情
      'pages/login/login',    // 登录页面
      'pages/user/user',      // 用户个人信息
      'pages/publish/publish'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      // 被Provider包裹的页面都能共享到应用的store， 有一个问题： 为什么Provider包裹的只有Index而没有Detail呢？
      <Provider store={store}>   
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
