import Taro from '@tarojs/taro';  // 端能力api

// 写入缓存
export function setCache(key, value) {
  let params = value;
  if (typeof value == 'object') {
    // 注意JSON.stringify是什么意思~
    params = JSON.stringify(value);
  }
  Taro.setStorageSync(key, params)
}

// 读取缓存
export function getCata(key) {
  let result = Taro.getStorageSync(key);
  if (result) {
    result = JSON.parse(result);
  } else {
    return null;
  }
  return result;
}