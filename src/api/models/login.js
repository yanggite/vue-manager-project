// 个人中心api
import http from "@/utils/request.js";
export default {
  login: (params = {}) => http.post("/admin/adminLogin", params),
  loginOut: (params = {}) => http.post("/admin/signOut", params),
  getCurrentUser: () => http.get("/admin/selectAdminInfo"),
};
