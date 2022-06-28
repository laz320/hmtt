import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/styles/reset.less'
import '@/styles/index.less'
// 1 导入所有组件
import Vant from 'vant'
// import 'vant/lib/index.css'
// 16 用less 不用css
import 'vant/lib/index.less'

// 55 全局变量
import 'amfe-flexible'
import MyIcon from '@/components/MyIcon.vue'

// 7 字体图标
// import '@/styles/icon.less'
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
