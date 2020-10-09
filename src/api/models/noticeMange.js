import http from "@/utils/request.js"
export default {
    //获取公告
    getNoticesList: (params = {}) => http.post("/notice/getNotices", params),
    //新增公告
    addNotice: (params = {}) => http.post("/notice/addNotice", params),
    //编辑公告
    editNotice: (params = {}) => http.post("/notice/editNotice", params),
    //删除公告
    delNotice: (params = {}) => http.post("/notice/delNotice", params),
    //获取留言列表
    getMessageBoardsList: (params = {}) => http.post("/notice/getMessageBoards", params),
    getGuidePageList: (params = {}) => http.post("/notice/guidePage", params),
    //新增引导
    addGuidePage: (params = {}) => http.post("/notice/addGuidePage", params),
    //删除
    delGuidePage: (params = {}) => http.post("/notice/delGuidePage", params),
    //编辑引导
    editGuidePage: (params = {}) => http.post("/notice/editGuidePage", params),
    //获取当前留言
    getMessageDetail: (params = {}) => http.post("/notice/getMessageDetail", params),
    //留言回复
    replyMessage: (params = {}) => http.post("/notice/reply", params),
}