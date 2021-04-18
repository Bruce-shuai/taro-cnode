import Taro from '@tarojs/taro';
import api from '../constants/api';
export function getJSON(url, data) {
  // Taro提供了一个request方法,这个方法返回的其实是一个promise对象。
  // 调用getJSON方法，返回的其实就是一个Promise对象
  return Taro.request({url:url, data:data, method:'GET'})
}

// 获取话题列表， 标记了async 就说明这个函数是异步函数
export async function getTopicList() {
  // 这里写了await，可以指示在此之后的函数调用，只有等待(await)getJSON返回了数据，才允许之后的代码能够执行
  // 这样，让异步的代码像同步的方式一样来开发项目
  // 返回了一个promise对象,  await出错就用catch来接收
  let result = await getJSON(api.gettopics).catch(message=>{
    console.log('出错了，错误信息：' + message);
  })      
  console.log(result);
  // console.log('123');  // 这里的123 只有getJSON返回数据后，才会继续执行
}