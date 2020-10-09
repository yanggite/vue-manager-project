import http from "@/utils/request.js"
export default {
  //获取列表
  getShopBaseInfo: (params = {}) => http.post("/shop/getShopBaseInfo", params),
  //编辑商品
  editCommodity: (params = {}) => http.post("/shop/editCommodity", params),
  //新增
  addCommodity: (params = {}) => http.post("/shop/addCommodity", params),
  //查询所有语言
  getSelectLanguage: (params = {}) => http.get("/shop/selectLanguage", params),
  //查询所有的产品分类
  getSelectProductCategory: (params = {}) => http.post("/shop/selectProductCategory", params),
  //新增商品
  addCommodity: (params = {}) => http.post("/shop/addCommodity", params),
  //删除商品
  delShop: (params = {}) => http.post("/shop/delShop", params),
  //id查询商品
  getShopBaseInfoById: (params = {}) => http.post("/shop/getShopBaseInfoById", params),
  //编辑商品
  editCommodity: (params = {}) => http.post("/shop/editCommodity", params),
  //获取会员等级
  getShopSelectLeave: () => http.get("/shop/selectLeave"),
  //商品上架
  editCommodityByIsUpdate: (params = {}) => http.post("/shop/editCommodityByIsUpdate",params),
}