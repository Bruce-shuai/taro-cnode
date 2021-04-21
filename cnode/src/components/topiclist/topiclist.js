import Taro, {Component} from '@tarojs/taro';
import {ScrollView} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {getTopicList, getNextList} from '../../actions/topiclist';
import Topic from './topic';

@connect(function(store){
  // store.topiclist 是从哪儿来的呢？  是从reducer的combineReducers里获取的
  // 这里的state的数据获取就显得非常有讲究了！ 从reducer的topiclist 和 menu.currentCata 获取的数据！
  return {...store.topiclist, currentCata: store.menu.currentCata}
}, function(dispatch){
  return {getTopicList(params) {
    dispatch(getTopicList(params))
  },
  getNextList(params) {
    dispatch(getNextList(params))
  }
  }
})

class Topiclist extends Component {
  // 把数据放在这个生命周期函数中好像不是太好吧？！
  componentWillMount() {
    // 这里的this.props是哪来的呢？好像是从connect中获取
    let {page, limit, currentCata} = this.props;
    this.props.getTopicList && this.props.getTopicList({page, limit, tab:currentCata.key});
  }
  // 到底后就触发分页请求, 肯定是要请求下一页 没有总页码
  onScrollToLower = () => {
    let {page, limit, currentCata} = this.props;
    //  注意： 这里是不能直接写成page+1 而是要写成page： page + 1
    this.props.getNextList && this.props.getNextList({page: (page + 1), limit, tab:currentCata.key});
  }
  render() {
    let { list } = this.props;    // 最初的list是空数组
    // onScrollToLower 是滚动到底部会触发事件
    return <ScrollView style={{height: '650PX'}} onScrollToLower={this.onScrollToLower} scrollY={true}>
      {list.map((item) => <Topic item={item} />)}
    </ScrollView>
  }
}
export default Topiclist;