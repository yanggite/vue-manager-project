import http from "@/utils/request.js"
export default {
    //订单
    getOrderList: (params = {}) => http.post("/order/getOrderList", params),
    //发货状态
    editOrderDeliveryStatus: (params = {}) => http.post("/order/editOrderDeliveryStatus", params),
    //订单状态
    editOrderState: (params = {}) => http.post("/order/editOrderState", params),
    //备注状态
    remarkOrder: (params = {}) => http.post("/order/remarkOrder", params),
    //关闭订单
    closeOrder: (params = {}) => http.post("/order/closeOrder", params),
    //订单详情
    getOrderInfoById: (params = {}) => http.post("/order/getOrderInfoById", params),
}
