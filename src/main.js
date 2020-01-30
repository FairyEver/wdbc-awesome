import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import { VLazyImagePlugin } from 'v-lazy-image'

import router from './router'
import store from './store'

import api from '@/plugins/api'
import publicPath from '@/plugins/public-path'

import '@/components'
import 'flex.css'

Vue.config.productionTip = false

Vue.use(VLazyImagePlugin)
Vue.use(Antd)
Vue.use(api)
Vue.use(publicPath)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
