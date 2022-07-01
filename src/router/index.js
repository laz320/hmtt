import Vue from 'vue'
import VueRouter from 'vue-router'
// 2
import Layout from '@/views/Layout'

// 10 懒加载写法
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')

// 12
const Login = () => import('@/views/Login')
const Search = () => ('@/views/Search')

Vue.use(VueRouter)

const routes = [
  // 3
  {
    path: '/',
    component: Layout,
    redirect: '/home', // 重定向 默认首次打开是首页
    // 11 配置路由
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'video',
        component: Video
      }, {
        path: 'question',
        component: Question
      }, {
        path: 'my',
        component: My,
        // 二
        name: 'my'
      }
    ]
  },
  // 13
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  }

]

const router = new VueRouter({
  routes
})

export default router
