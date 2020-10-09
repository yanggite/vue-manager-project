export default [
    {
      path: "/admin/sysLog",
      name: "sysLog",
      component: () => import(/* webpackChunkName: "home" */ "@/views/system/sysLog.vue"),
      meta: {
        title: '系统日志'
      },
    },
    {
      path: "/admin/sysConf",
      name: "sysConf",
      component: () => import(/* webpackChunkName: "system" */ "@/views/system/sysConf.vue"),
      meta: {
        title: '系统参数'
      },
    },
    // {
    //   path: "/admin/notice",
    //   name: "notice",
    //   component: () => import(/* webpackChunkName: "system" */ "@/views/system/notice.vue"),
    //   meta: {
    //     title: '公告管理'
    //   },
    // },
    {
      path: "/admin/appVersion",
      name: "appVersion",
      component: () => import(/* webpackChunkName: "system" */ "@/views/system/appVersion.vue"),
      meta: {
        title: 'APP版本管理'
      },
    },
    {
      path: "/system/getCoinConfig",
      name: "currencyConfig",
      component: () => import(/* webpackChunkName: "system" */ "@/views/system/currencyConfig.vue"),
      meta: {
        title: '币种配置'
      },
    },
  ]
  