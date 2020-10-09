import http from "@/utils/request.js"
export default {
  // login: (params = {}) => http.post("/admin/addAdmin", params),
  //获取APP版本列表
  getAppVersionList: (params = {}) => http.post("/system/getAppVersionInfos", params),
  //新增APP版本
  addAppVersionInfo: (params = {}) => http.post("/system/addAppVersionInfo", params),
  //编辑APP版本
  editAppVersionInfo: (params = {}) => http.post("/system/editAppVersionInfo", params),
  //删除
  delAppVersionInfo: (params = {}) => http.post("/system/delAppVersionInfo", params),
  //获取系统参数
  getSysConfigList: (params = {}) => http.post("/system/getSysConfig", params),
  //编辑系统参数
  editSysConfig: (params = {}) => http.post("/system/editSysConfig", params),
  //获取系统日志
  getSystemLogList: (params = {}) => http.post("/system/getSystemLog", params),
  //新增币种
  addCoinConfig: (params = {}) => http.post("/system/addCoinConfig", params),
  //币种
  getCoinConfig: (params = {}) => http.post("/system/getCoinConfig", params),
  //区块链
  getBlockConfig: () => http.get("/system/getBlockConfig"),
    //币种
    editCoinConfig: (params = {}) => http.post("/system/editCoinConfig", params),
}