import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import ElementUI from 'element-ui';


import  ElTreeGrid   from 'element-tree-grid';
Vue.component(ElTreeGrid .name,ElTreeGrid );
// import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
//弹窗拖拽功能
import './utils/directives';
//低版本内核兼容插件
import 'babel-polyfill';
//关闭严格模式
Vue.config.productionTip = false;

//element国际化入口
// Vue.use(VueI18n);
Vue.use(ElementUI);


//挂载全局api请求
import api from "@/api/index.js"
Vue.use(api);
//本地存储
import local from "./utils/local";
Vue.prototype.$local = local;

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     } else {
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         } else {
//             next();
//         }
//     }
// });

import dayjs from "dayjs"

Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return dayjs(dateStr).format(pattern);
  })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
