import Vue from 'vue'
import Vuex from 'vuex'
import User from "./modules/user"
import Common from "./modules/common"

//持久化存储
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    User,
    Common
  },
  plugins:[createPersistedState({
    storage: window.localStorage,//存到session
    reducer(val) {
      return {
        User: {
          isLogin: val.User.isLogin,
          routerList:val.User.routerList
        }
      }
    }
  })]
})
