import axios from 'axios';
import { HOST } from "../config/host";
import { Message } from "element-ui";
import router from '../router/index'
// axios.defaults.baseURL = HOST;
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL : HOST,
    timeout: 5000
});

service.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      const token = localStorage.getItem('token')
      if (token) {
        // config.headers['Authorization'] = `Bearer ${token}`
        config.headers['token'] = `${token}`
      }
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if(response.data.code == 303){
                Message.error(response.data.msg)
                // return  location.href = '/login'
                return router.replace("/login")
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;

// /**
//  * ajax请求封装
//  * created lxc data:2020-06-11
//  */
// //引入axios和qs
// import axios from "axios"
// import Qs from "qs"
// import local from "./local";
// import { HOST } from "../config/index"
// import router from "@/router";
// import { Message } from "element-ui"
// //统一请求地址
// axios.defaults.baseURL = HOST;
// //请求超时 5秒超时
// axios.defaults.timeouts = 5000;

// axios.defaults.headers['Content-Type'] = 'application/json'





// // 请求拦截器
// axios.interceptors.request.use(config => {
//     let token=local.get("token")
//     config.headers.token=token;
//     return config;
// }, err => {
//     return Promise.reject(error);
// })

// // 响应拦截器
// axios.interceptors.response.use(res => {
//     if(res.status===200){
//         let {code,msg}=res.data
//         if(code==='303'||code==='511'){
//             Message.error(msg)
//             router.replace({
//                 path:"/login"
//             })
//         }else{
//             return res.data
//         }
//     }
// }, err => {
//     return Promise.reject(err);
// })

// //暴露
// export default {
//     get(url, params = {}) {
//        return axios.get(url, { params})        
//     },
//     post(url, params = {},opt={json:true}) {
//         return axios.post(url, opt.json?params:Qs.stringify(params)) 
//     },
//     downLoadfile(url,params={},name){
//         axios({
//             method: "post",
//             url: url,
//             data: params,
//             responseType: "blob",
//           }).then((res) => {
//             let url = window.URL.createObjectURL(res);
//             let link = document.createElement("a");
//             link.style.display = "none";
//             link.href = url;
//             link.setAttribute("download", name);
//             document.body.appendChild(link);
//             link.click();
//           });
//     }
// }


