import http from "@/utils/request.js"
export default {
  getRoleList: (params = {}) => http.post("/admin/getRoles", params),
  editRole: (params = {}) => http.post("/admin/editRole", params),
  addRole: (params = {}) => http.post("/admin/addRole", params),
  delRole: (params = {}) => http.post("/admin/delRole", params),
  getAdminList: (params = {}) => http.post("/admin/getAdmins", params),
  editAdmin: (params = {}) => http.post("/admin/editAdmin", params),
  //新增管理员
  addAdmin: (params = {}) => http.post("/admin/addAdmin", params),
  //修改管理员状态
  setAdminState: (params = {}) => http.post("/admin/setAdminState", params),
  //删除管理员
  delAdmin: (params = {}) => http.post("/admin/delAdmin", params),
  //编辑管理员
  editAdmin: (params = {}) => http.post("/admin/editAdmin", params),
  //分配权限查询
  getPowerRole: (id) => http.get(`/admin/powerRole?id=${id}`),
  //分配按钮查询
  getBtnRole: (id) => http.get(`/admin/btnRole?id=${id}`),
  //分配按钮
  updateBtn: (params = {}) => http.post("/admin/updateBtn", params),
  //分配权限
  updatePower: (params = {}) => http.post("/admin/updatePower", params),
  //查询当前按钮
  getBtnPower: (params = {}) => http.post("/admin/btnPower", params),
  //获取团队权限标识
  getSelectTeamTag: () => http.get("/admin/selectTeamTag"),
}