import http from "@/utils/request.js"
export default {
  //获取充值列表
  getRechargeLog: (params = {}) => http.post("/recharge/getRechargeLog", params),
  //获取充值详情
  getRechargeDetail: (params = {}) => http.post("/recharge/getDetails", params),
  //获取提现列表
  getWidthdrawList: (params = {}) => http.post("/widthdraw/getWidthdrawApply", params),
  //获取充值地址
  getAllPoolAddress: (params = {}) => http.post("/recharge/getAllPoolAddress", params),
  //获取打款地址
  getAllPaymentAddress: (params = {}) => http.post("/widthdraw/getAllPaymentAddress", params),
  //提现列表-取消
  batchCancel: (params = {}) => http.post("/widthdraw/batchCancel", params),
  //提现列表-打款
  batchPayApply: (params = {}) => http.post("/widthdraw/batchPayApply", params),
  //提现列表-手动上账
  manualPayment: (params = {}) => http.post("/recharge/manualPayment", params),
}