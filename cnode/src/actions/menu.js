// 显示抽屉
export function showDrawer() {
  return dispatch => {
    dispatch({type: 'showDrawer'})
  }
}

// 切换当前分类
export function changeCata(cata){
  return dispatch => {
    dispatch({type: 'changeCata', currentCata:cata })
  }
}

// 隐藏抽屉
export function hideDrawer() {
  return dispatch => {
    dispatch({type: 'hideDrawer'})
  }
}