export default [
    {
      path: "/admin/userTeam",
      name: "teamMange",
      component: () => import(/* webpackChunkName: "userMangeRouter" */ "@/views/userMange/teamMange.vue"),
      meta: {
        title: '团队管理'
      },
    },
    {
        path: "/admin/user",
        name: "userMange",
        component: () => import(/* webpackChunkName: "userMangeRouter" */ "@/views/userMange/userMange.vue"),
        meta: {
          title: '用户管理'
        },
      },
      {
        path: "/admin/teamUserInfo",
        name: "relation",
        component: () => import(/* webpackChunkName: "userMangeRouter" */ "@/views/userMange/relation.vue"),
        meta: {
          title: '推荐关系列表'
        },
      },
  ]