export default [
    {
      path: "/admin/baseParam",
      name: "baseParam",
      component: () => import(/* webpackChunkName: "paramsRouter" */ "@/views/params/baseParam.vue"),
      meta: {
        title: '基本参数'
      },
    },
  ]