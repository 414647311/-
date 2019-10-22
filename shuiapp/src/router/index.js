import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('../page/login.vue')
const index = () => import('../page/index.vue')
const findManage = () => import('../page/findManage.vue')
const banner = () => import('../page/banner.vue')
const teacher = () => import('../page/teacher.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/index/:type?',
      component: index,
      children: [
        {
          path: 'findManage',
          component: findManage
        },
        {
          path: 'banner',
          component: banner
        }, {
          path: 'teacher',
          component: teacher
        }
      ]
    }
  ]
})
