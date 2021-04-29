import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 中央管理的数据
  state: {
    tabIndex: 0
  },
  // 更改中央管理的数据
  mutations: {
    // 第一个值固定，第二值为要修改之后的值
    changeTabIndex(state, index) {
      state.tabIndex = index;
    }
  },
  actions: {
  },
  modules: {
  }
})
