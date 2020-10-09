import axios from 'axios'
// import http from "@/utils/request.js"
// axios.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('token')
//     if (token) {
//       // config.headers['Authorization'] = `Bearer ${token}`
//       config.headers['token'] = `${token}`
//     }
//     return config
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   })




// 导出Excel公用方法 get
export function exportMethod(data) {
    axios({
        method: data.method,
        url: `${data.url}${data.params ? '?' + data.params : ''}`,
        responseType: 'blob'
    }).then((res) => {
        const link = document.createElement('a')
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
 
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = data.fileName //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }).catch(error => {
        // this.$Notice.error({
        //     title: '错误',
        //     desc: '网络连接错误'
        // })
        console.log(error)
    })
}


//post
export function exportMethodPost(data) {
    axios({
        method: data.method,
        url: `${data.url}`,
        data:data.data,
        responseType: 'blob'
    }).then((res) => {
        const link = document.createElement('a')
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
 
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = data.fileName //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log(res)
    }).catch(error => {
        // this.$Notice.error({
        //     title: '错误',
        //     desc: '网络连接错误'
        // })
        console.log(error)
    })
}