import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const index = () => import('@/views/index.vue') //主页
const diy = () => import('@/views/diy.vue') //diy

const routes = [
  { path: '/', name: '首页', component: index },
  { path: '/diy', name: '小程序DIY', component: diy },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
