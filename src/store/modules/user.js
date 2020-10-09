import login from "../../api/models/login";
import local from "../../utils/local";
const User = {
  state: {
    isLogin: false,
    routerList: [],
    currentUrl:""
  },
  mutations: {
    changeLogin(state, val) {
      state.isLogin = val;
    },
    logOut(state) {
      state.isLogin = false;
    },
    updateRouterList(state, val) {
      console.log("store,state.routerList",state.routerList)
      console.log("store",val)
      // return Object.assign(state.routerList, val);
      // return  state.routerList=val
      // let data=Object.assign({},state.routerList,val);
      // state.routerList=data;
      return state.routerList=val
    },
    updateCurrentUrl(state, val){
      // console.log("store.state.currentUrl",state.currentUrl);
      // console.log("store.val",val);
      return state.currentUrl=val;
    }
  },
  actions: {
    globalLogin({ commit, state }, val) {
      return new Promise((resolve, reject) => {
        login.login(val).then((res) => {
          let { status, data, message } = res;
          if (status === "200") {
            local.set("token", data);
            commit("changeLogin", true);
            resolve();
          } else {
            reject(message);
          }
        });
      });
    },
  },
  getters: {},
};

export default User;
