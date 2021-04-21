const MENU_STATE={
  cataData:[{key: "all", value: "全部"},
            {key: "good", value: "精华"},
            {key: "share", value: "分享"},
            {key: "ask", value: "问答"},
            {key: "job", value: "招聘"},
            {key: "dev", value: "客户端测试"}],
  currentCata: {key: "all", value: "全部"},
  showDrawer: false
}

// 这里要写default    action是最新接受的数据
export default function meun(prestate = MENU_STATE, action) {
  switch(action.type) {
    // 这些数据都是要传给store里去的
    // 显示分类抽屉
    case 'showDrawer':
      return {...prestate, showDrawer: true};
    // 隐藏抽屉
    case 'hideDrawer':
      return {...prestate, showDrawer: false};
    // 点击抽屉，触发切换分类
    case 'changeCata':
      return {...prestate, currentCata:action.currentCata};
    default: 
      return {...prestate}
  }
}