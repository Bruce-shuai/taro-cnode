import Taro, {Component} from '@tarojs/taro';
import {View, Text, Button, Textarea} from '@tarojs/components';
import './replycontent.less';
// 这个组件放在页面上，组件之间不做任何嵌套（主页放逻辑，组件只承载渲染）
class ReplyContent extends Component {
  btnOk = () => {
    if (this.state.value) {
      this.props.onOkReplyContent && this.props.onOkReplyContent(this.state.value)
    } else {
      Taro.showToast({title: '请输入评论内容', icon: 'none'})
    }
    // this.props.onOk();
  }
  btnCancel = () => {
    this.props.onCancelReplyContent&&this.props.onCancelReplyContent();
  }
  changeContent = (e) => {
    if (e && e.target) {
      // 这里的state对应的是哪里？ 直接强行写个state，不用初始化？   如果能加一个防抖就太好了~
      // console.log('e.target:' + e.target.value);
      this.setState({value: e.target.value});   // 取到输入的值，赋值给state
    }
  }
  render() {
    return <View className='replycontent'>
      {/* 这里onInput就和h5的onChange效果是一样的，只是onChange不兼容小程序 */}
      {/* 输入框 */}
      <Textarea onInput={this.changeContent} className='replycontent-text' placeholder='请输入回复内容'></Textarea>
      {/* 按钮 */}
      <View className='replycontent-btngroup'>
        <Button onClick={this.btnOk} className='btn'>确定</Button>
        <Button onClick={this.btnCancel} className='btn'>取消</Button>
      </View>
    </View>
  }
}
export default ReplyContent;