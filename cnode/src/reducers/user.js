import {setCache, getCache} from '../utils/cache';
const cacheKey='cnode-user-key';
// 读取缓存
const user_cache = getCache(cacheKey)?getCache(cacheKey):{}
const USER_STATE = {   // user_cache要么是空对象要么是对象，不能是undefined，不然极有可能出问题
  // accesstoken: null, // 用户秘钥
  ...user_cache
}

// 这里的default 不要忘记写了~
// switch 里面，每个变量块的名字是不能重复的
export default function user(prestate=USER_STATE, action) {
  switch(action.type) {
    case 'loginSuccess': 
    let succstate = {...prestate, ...action}
    setCache(cacheKey, state) // 设置到缓存中
    return succstate;  
    case 'loginFail': 
    let failstate = {...prestate, accesstoken: action.accesstoken, loginname: action.loginname}
    setCache(cacheKey, state)
    return failstate;
    default:
      return {...prestate}
  }
}