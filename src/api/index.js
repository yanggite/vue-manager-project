import http from "@/utils/request.js";
let api = {};
const context = require.context("./models", true, /\.js$/);
context.keys().forEach((e) => {
  api = { ...api, ...context(e).default };
});
const install = (Vue, vm) => {
  api.downLoadfile=http.downLoadfile //导出excel
  Vue.prototype.$api = api;
};
export default {
  install,
};
