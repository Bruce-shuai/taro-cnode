import Taro from '@tarojs/taro';  // 端能力api
import {IValue} from '../interface/ICache';
// 写入缓存
export function setCache(key:string, value:IValue):void {
  let params:any = value;  
  if (typeof value == 'object') {
    // JSON.stringify方法用于将 JavaScript 值转换为 JSON 字符串
    params = JSON.stringify(value);   // 说明了JS变量是可以接受JSON的
  }
  // 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
  // 有一个疑问，这里的本地缓存是指的localstorage还是cookie呢？还是其他什么东西呢？
  Taro.setStorageSync(key, params)
}

// 读取缓存
export function getCache(key) {
  // 从本地缓存中同步获取指定 key 对应的内容。
  let result = Taro.getStorageSync(key);
  if (result) {
    // JSON.parse用于将一个JSON字符串转换为对象
    result = JSON.parse(result);
  } else {
    return null;
  }
  return result;
}