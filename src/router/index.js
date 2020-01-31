import Vue from 'vue'
import VueRouter from 'vue-router'

import layoutMain from '@/layouts/main'

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'album' },
    component: layoutMain,
    children: [
      {
        name: 'album',
        path: 'album',
        component: () => import('@/views/album')
      },
      {
        name: 'sync',
        path: 'sync',
        component: () => import('@/views/sync')
      },
      {
        name: 'log',
        path: 'log',
        component: () => import('@/views/log')
      },
      {
        name: 'setting',
        path: 'setting',
        component: () => import('@/views/setting')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
