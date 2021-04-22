const USER_STATE = {
  accesstoken: null, // 用户秘钥
}

// 这里的default 不要忘记写了~
export default function user(prestate=USER_STATE, action) {
  switch(action.type) {
    case 'loginSuccess': 
    return {...prestate, ...action}
    case 'loginFail': 
    return {...prestate, accesstoken: action.accesstoken, loginname: action.loginname}
    default:
      return {...prestate}
  }
}