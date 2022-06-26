import Vue from 'vue'
import Vuex from 'vuex'
// 51
import VuexPersistence from 'vuex-persist'

// 52 创建对象 指定用的方式为本地存储
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  // 48
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    // 49
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  },
  // 53
  plugins: [vuexLocal.plugin]
})
