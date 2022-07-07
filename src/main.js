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

// 一次性吧fifters/index.js中所有的按需导出全部导出来  作为obj的属性
import * as obj from '@/fifters'

import FollowUser from '@/components/FollowUser.vue'

import '@/components'

Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
// 7 字体图标
// import '@/styles/icon.less'
// 架构性代码
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

// 全局组件的方式
Vue.component(FollowUser.name, FollowUser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
