import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import router from './router'
import store from './store'

import api from '@/plugin/api'

import '@/components'
import 'flex.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
