export default [
    {
      path: "/admin/reachgeList",
      name: "recharge",
      component: () => import(/* webpackChunkName: "recharge" */ "@/views/cashMange/recharge.vue"),
      meta: {
        title: '充值列表'
      },
    },
    {
        path: "/admin/applyList",
        name: "withdraw",
        component: () => import(/* webpackChunkName: "recharge" */ "@/views/cashMange/withdraw.vue"),
        meta: {
          title: '提现列表'
        },
      },
      {
        path: "/admin/balanceDetail",
        name: "balanceDetail",
        component: () => import(/* webpackChunkName: "recharge" */ "@/views/cashMange/balanceDetail.vue"),
        meta: {
          title: '余额明细'
        },
      },
  ]