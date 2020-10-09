export default [
    {
        path: "/admin/getShop",
        name: "shopList",
        component: () => import(/* webpackChunkName: "shop" */ "@/views/shop/shopList.vue"),
        meta: {
            title: '商品列表'
        },
    },
    {
        path: "/admin/getShopLog",
        name: "shopLog",
        component: () => import(/* webpackChunkName: "shop" */ "@/views/shop/shopLog.vue"),
        meta: {
            title: '商品日志'
        },
    },
    {
        path: "/admin/addShop",
        name: "addShop",
        component: () => import(/* webpackChunkName: "shop" */ "@/views/shop/addShop.vue"),
        meta: {
            title: '填写商品信息'
        },
    },
    {
        path: "/admin/editShop",
        name: "editShop",
        component: () => import(/* webpackChunkName: "shop" */ "@/views/shop/editShop.vue"),
        meta: {
            title: '编辑商品信息'
        },
    },
]