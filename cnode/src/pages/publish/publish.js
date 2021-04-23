import Taro, {Component} from '@tarojs/taro';
import {Input, View, Picker, Textarea, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { submitTopic } from '../../actions/topiclist';
import './publish.less';
@connect(function(store){
  return {...store.menu, ...store.user}
})


class Publish extends Component {
  // 这个项目的有个注意点就是，数据是当前所需要，还是全局所需要
  state = {
    selectCata: null,
    title: null,
    content: null
  }
  changeCata(e){
    let {cataData} = this.props;
    this.setState({selectCata:cataData[e.detail.value]})
  }
  // 标题改变
  titleChange = (e) => {
    this.setState({title: e.target.value})
  }
  // 内容改变
  contentChange = (e) => {
    this.setState({content: e.target.value})
  }
  // 提交
  submitTopic = () => {
    // 数据都不为空的情况下才可以提交
    let {title, content} = this.state;
    let {assesstoken} = this.props;
    if (title && content && selectCata) {
      let params = {tab: 'dev', title, content, accesstoken}
      // 没有在connect里dispatch下面这个函数
      submitTopic(params).then(result => {
        if (result) {
          // 下面这个Taro函数是有什么用
          // Taro.navigateBack();  // 似乎还不能让页面刷新
          Taro.redirectTo({url:'/pages/user/user'})
        }
      })
    } else {
      Taro.showToast({title: '分类或者标题内容都不能为空！', icon:'none'})
    }
  }
  render() {
    let { cataData } = this.props;
    let { selectCata } = this.state;
    return <View className='publish-topic'>
      <Input className='publish-topic-title' onInput={this.titleChange} placeholder='请输入您要发布的标题'/>
      <Textarean className='publish-topic-content' onInput={this.contentChange} placeholder='请输入您要发布的内容' />
      {/* 这个Picker组件要多注意注意！！ */}
      <Picker onChange={this.changeCata} mode='selector' range={cataData} rangeKey='value'>
        <View className='publish-topic-cata'>{selectCata ? selectCata.value : '请选择'}</View>
      </Picker>
      <Button className='publish-topic-btn' onClick={this.submitTopic}>提交</Button>
    </View>
  }
}
export default Publish;