import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api'

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default({
    api
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
