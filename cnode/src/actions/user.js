import Taro from '@tarojs/taro';
import api from '../constants/api';
import {getJSON, postJSON} from '../utils/request';

// 验证accesstoken
export function accessUserToken(params) {
    return async dispatch => {
      let result = await postJSON(api.checkusertoken, params);
      if (result && result.data && result.data.success) {
        // 用户名是用来做用户查询？  似乎dispatch不影响return的执行
        dispatch({type: 'loginSuccess', accesstoken: params.accesstoken, loginname: result.data.loginname, avatar_url: result.data.avatar_url})
        return result.data;
      } else {
        dispatch({type: 'loginFail', accessUserToken: null, loginname: null})
      }
      return false;
    }
}


// 搞懂几种发送dispatch的方式
// 获取用户信息
export async function getUserInfo(params) {
  let result = await getJSON(api.getuserinfo + params.loginname)
  if (result && result.data && result.data.success) {
    return result.data;
  } else {
    Taro.showToast({title: '拉取用户信息失败'});
  }
}