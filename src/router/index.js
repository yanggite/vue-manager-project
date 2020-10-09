import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import homeRouter from "./models/home"
import authorityRouter from "./models/authority"
import systemRouter from "./models/system"
import paramsRouter from "./models/params"
import userMangeRouter from "./models/userMange"
import noticeMangeRouter from "./models/noticeMange"
import cashMangeRouter from "./models/cashMange"
import shopRouter from "./models/shop"
import orderRouter from "./models/order"

export default new Router({
    routes: [
        {
            path: '/',
            // redirect: '/firstpage'
            redirect: '/login'
        },
        {
            path: '/admin/index',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'),
            children: [...homeRouter, ...authorityRouter, ...systemRouter, ...paramsRouter, ...userMangeRouter, ...noticeMangeRouter, ...cashMangeRouter, ...shopRouter, ...orderRouter]
        },
        // {
        //     path: '/',
        //     component: () => import(/* webpackChunkName: "authorityRouter" */ '../components/Home.vue'),
        //     children: [...authorityRouter]
        // },
        // {
        //     path: '/',
        //     component: () => import(/* webpackChunkName: "authorityRouter" */ '../components/Home.vue'),
        //     children: [...systemRouter]
        // },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName: "erro" */ '../components/404.vue'),
            meta: { title: '404' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    mode: "history"
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}