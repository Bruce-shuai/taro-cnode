import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './menu.less';
import {showDrawer, changeCata, hideDrawer} from '../../actions/menu';
import { AtDrawer } from 'taro-ui'

@connect(function(store){
  // 这里的store.menu是个什么意思呢？
  return {...store.menu}
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


// 我草，有好多的接口
class Menu extends Component {
  // 显示抽屉
  showDrawer() {
    this.props.showMenu&&this.props.showMenu();
  }
  getItems(cataData) {
    return cataData.map(item => item.value)
  }
  // 点击分类时触发
  clickCata = (index) => {
    let {cataData} = this.props;
    // 获取点击项的数据
    let clickCata = cataData[index];
    if (clickCata.key !== this.props.currentCata.key) {
      this.props.changeCata&&this.props.changeCata(clickCata);
    }
  }
  // 关闭抽屉时触发
  closeDrawer = () => {
    this.props.hideDrawer&&this.props.hideDrawer();
  }
  render() {
    // 这里的this.props是指向哪的？
    let {showDrawer, cataData} = this.props;
    let items = this.getItems(cataData);  // 获取分类列表
    // 要对每个组件引入它不同的样式
    // className 的名字写特殊点，不然后面再写给样式命名就麻烦了
    return <View className='topiclist-menu'>
      {/* 这个absolute的用法要好好注意一下, 这里的showDrawer是从store.menu这里取得的 */}
      <AtDrawer onClose={this.closeDrawer} onItemClick={this.clickCata} style='position:absolute;' show={showDrawer} items={items}/>
      {/* 小程序中似乎不能给事件写箭头函数 */}
      <Image onClick={this.showDrawer} className='image' src={require('../../assets/img/cata.png')}/>
      <Text>{this.props.currentCata ? this.props.currentCata.value : ''}</Text>
      <Image className='image' src={require('../../assets/img/login.png')}/>
    </View>
  }
}
export default Menu;