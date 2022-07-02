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
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    // 49
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    // 根据索引删除一个
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    // 删除所有
    delAllHistroy (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  // 53
  plugins: [vuexLocal.plugin]
})
