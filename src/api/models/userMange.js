import http from "@/utils/request.js"
export default {
  getUserList: (params = {}) => http.post("/admin/user", params),
  //获取等级
  getSelectLeave: (params = {}) => http.post("/admin/selectLeave", params),
  //编辑用户信息
  editUser: (params = {}) => http.post("/admin/editUser", params),
  //推荐人关系
  getTeamUserInfo: (params = {}) => http.post("/admin/teamUserInfo", params),
  //团队管理
  getUserTeam: (params = {}) => http.post("/admin/userTeam", params),
  //资产详情
  getUserDetail: (params = {}) => http.post("/admin/userAssetDetails", params),
  //查询所有币种
  getSelectCoin: (params = {}) => http.get("/admin/selectCoin", params),
  //增加团队
  addUserTeam: (params = {}) => http.post("/admin/addUserTeam", params),
  //打款地址归集地址所有地址
  selectAddress: (params = {}) => http.post("/admin/selectAddress", params),
  //编辑团队
  editUserTeam: (params = {}) => http.post("/admin/editUserTeam", params),
}