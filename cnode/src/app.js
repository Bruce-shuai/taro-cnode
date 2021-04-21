// import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'

import configStore from './store'
import '@tarojs/async-await'
import './app.less'

const store = configStore()

class App extends Component {

  config = {
    // 这是所有的路由，增加路由也是在这里增加
    pages: [
      'pages/index/index',
      'pages/detail/index'
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
      // 被Provider包裹的页面都能共享到应用的store
      <Provider store={store}>   
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
