import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {AtDrawer} from 'taro-ui';
import {showDrawer, changeCata, hideDrawer} from '../../actions/menu';
import {validateUser} from '../../actions/user';
import './menu.less';

// 这里的store是最新的state
@connect(function(store){
// 这里的store.menu是个什么意思呢？估计这里的store.menu从reducers的  对的，是最新的state
  return {...store.menu, user: store.user}    // 这里是连接到store.menu吗
}, function(dispatch){
return {showMenu(){
  // 这种写法是redux异步请求的标准事例
  dispatch(showDrawer())
  },
  hideDrawer(){
    dispatch(hideDrawer())
  },
  changeCata(cata){
    dispatch(changeCata(cata));
  }
}
})


class Menu extends Component {
  // 这些函数都是在render函数之外来写的
  // 显示抽屉
  showDrawer = () => {
    // && 的使用是为了防止showMenu什么都没有报错， 
    // 执行showMenu，这里不需要网络请求接口 
    // 就会让dispatch发送一个showDrawer的action, 这样就会让store的数据更新
    this.props.showMenu && this.props.showMenu();
  }
  // 获取抽屉列表内容
  getItems(cataData) {
    return cataData.map(item => item.value)
  }
  // 点击分类时触发
  clickCata = (index) => {
    let {cataData} = this.props;
    // 获取点击项的数据
    let clickCata = cataData[index];
    // 这也算是性能优化
    if (clickCata.key !== this.props.currentCata.key) {
      this.props.changeCata&&this.props.changeCata(clickCata);
    }
  }
  // 关闭抽屉时触发
  closeDrawer = () => {
    this.props.hideDrawer&&this.props.hideDrawer();
  }

  toLogin = () => {
    let {user} = this.props;
    validateUser(user).then(result => {
      // 要区分login页面和user页面
      if (result) {
      // 成功跳转到用户详情页面
      Taro.navigateTo({url:'/pages/user/user'});
      } else {
      // 失败跳转到登录页
      Taro.navigateTo({url:'/pages/login/login'});
      }
    });
    
  }

  render() {
    // 这里的this.props是指向哪的？
    let {showDrawer, cataData} = this.props;
    let items = this.getItems(cataData);  // 获取分类列表
    // 要对每个组件引入它不同的样式
    // className 的名字写特殊点，不然后面再写给样式命名就麻烦了
    return <View className='topiclist-menu'>
      {/* 这个absolute的用法要好好注意一下, 这里的showDrawer是从store.menu这里取得的 */}
      {/* 这个抽屉是单独弄出来的，不是放在图片里面的，但是是通过show来展示或隐藏抽屉 */}
      <View className='drawer'>
        {/* onClose和onItemClcik都是AtDrawer自带的事件 */}
        {/* (index) => this.clickCata(index) 写成 this.clickCata 叫消参吗?  注意，onItemClick的index，是人家高阶函数自己提供的 这里的style 后面必须要写; ？ */}
        <AtDrawer 
          // 这个事件是组件自带的 
          onClose={this.closeDrawer} 
          // 这个事件是组件自带的 
          onItemClick={(index) => this.clickCata(index)} 
          style='position:absolute;' 
          show={showDrawer}    // true，抽屉展开， false，抽屉关闭
          items={items}
        />
      </View>
      {/* 小程序中似乎不能给事件写箭头函数, 这里是给图片弄了个事件来控制抽屉功能 */}
      <Image onClick={this.showDrawer} className='image left' src={require('../../assets/img/cata.png')}/>
      <Text>{this.props.currentCata ? this.props.currentCata.value : ''}</Text>
      <Image onClick={this.toLogin} className='image right' src={require('../../assets/img/login.png')}/>
    </View>
  }
}
export default Menu;