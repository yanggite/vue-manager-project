export default [
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () =>import(/* webpackChunkName: "home" */ "@/views/home/FirstPage.vue"),
  //   meta: {
  //     title: '系统首页'
  //   },
  // },
  {
    path: "/home",
    name: "home",
    component: () =>import(/* webpackChunkName: "home" */ "@/views/home/homeIndex.vue"),
    meta: {
      title: '系统首页'
    },
  },
  // {
  //   path: "/accset",
  //   name: "accset",
  //   component: () =>import(/* webpackChunkName: "home" */ "@/views/home/AccSet.vue"),
  //   meta: {
  //     title: '账户设置'
  //   },
  // },
  // {
  //   path: "/loginlog",
  //   name: "loginlog",
  //   component: () =>import(/* webpackChunkName: "home" */ "@/views/home/LoginLog.vue"),
  //   meta: {
  //     title: '登录日志'
  //   },
  // },
];
