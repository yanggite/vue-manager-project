export default [
  {
    path: "/admin/admininfo",
    name: "admin",
    component: () => import(/* webpackChunkName: "authorityRouter" */ "@/views/authority/AdminManage.vue"),
    meta: {
      title: '管理员管理'
    },
  },
  {
    path: "/admin/power",
    name: "power",
    component: () => import(/* webpackChunkName: "authorityRouter" */ "@/views/authority/PowerManage.vue"),
    meta: {
      title: '权限管理'
    },
  },
  {
    path: "/admin/role",
    name: "role",
    component: () => import(/* webpackChunkName: "authorityRouter" */ "@/views/authority/RoleManage.vue"),
    meta: {
      title: '角色管理'
    },
  },
]
