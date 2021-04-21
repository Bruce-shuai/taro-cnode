const USER_STATE = {
  accesstoken: 'e0b6179c-be80-4554-8f6e-db497e79e3c3', // 用户秘钥
}

// 这里的default 不要忘记写了~
export default function user(prestate=USER_STATE, action) {
  switch(action.type) {
    default:
      return {...prestate}
  }
}