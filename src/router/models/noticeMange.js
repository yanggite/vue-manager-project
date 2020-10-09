export default [
    {
        path: "/admin/notice",
        name: "notice",
        component: () => import(/* webpackChunkName: "notice" */ "@/views/noticeMange/notice.vue"),
        meta: {
            title: '公告管理'
        },
    },

    {
        path: "/notice/guidePage",
        name: "guidePage",
        component: () => import(/* webpackChunkName: "notice" */ "@/views/noticeMange/guidePage.vue"),
        meta: {
            title: '引导页面'
        },
    },

    {
        path: "/admin/message",
        name: "messageBord",
        component: () => import(/* webpackChunkName: "notice" */ "@/views/noticeMange/messageBord.vue"),
        meta: {
            title: '留言板'
        },
    },

]
