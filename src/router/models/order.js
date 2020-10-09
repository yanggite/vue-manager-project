export default [
    {
        path: "/admin/order",
        name: "orderList",
        component: () => import(/* webpackChunkName: "order" */ "@/views/order/orderList.vue"),
        meta: {
            title: '订单列表'
        },
    },
    {
        path: "/admin/orderDetail",
        name: "orderDetail",
        component: () => import(/* webpackChunkName: "order" */ "@/views/order/orderDetail.vue"),
        meta: {
            title: '订单详情'
        },
    },


]