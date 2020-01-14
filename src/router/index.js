import Vue from 'vue'
import VueRouter from 'vue-router'

import layoutMain from '@/layouts/main'

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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
