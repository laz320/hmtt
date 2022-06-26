import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1 导入所有组件
import Vant from 'vant'
// import 'vant/lib/index.css'
// 16 用less 不用css
import 'vant/lib/index.less'

import 'amfe-flexible'

// 7 字体图标
import '@/styles/icon.less'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
