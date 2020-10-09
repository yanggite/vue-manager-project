//存放一些常用的状态
const Common = {
    state: {
        //是否折叠菜单
        iscollapse:false,
    },
    mutations: {
      changeCollapse(state, val) {
        state.iscollapse=!state.iscollapse;
      }
    },
    actions: {},
    getters: {},
  };
  
  export default Common;