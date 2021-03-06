// https://vuex.vuejs.org/zh/api/

const shortid = require('shortid')
const { cloneDeep } = require('lodash')

export default ({ api }) => ({
  namespaced: true,
  state: {
    value: []
  },
  getters: {
    /**
     * @description description
     * @example $store.getters['log/list']
     * @example this.$store.getters['log/list']
     */
    list (state, getters, rootState, rootGetters) {
      return cloneDeep(state.value).reverse()
    },
    /**
     * @description description
     * @example $store.getters['log/length']
     * @example this.$store.getters['log/length']
     */
    length (state, getters, rootState, rootGetters) {
      return state.value.length
    }
  },
  mutations: {
    /**
     * @description 日志 添加
     * @param {Object} state state
     * @param {String} log 日志信息
     * @example $store.commit('log/push')
     * @example this.$store.commit('log/push')
     */
    push (state, log = '') {
      state.value.push({
        id: shortid.generate(),
        text: log
      })
    },
    /**
     * @description 日志 清空
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('log/clean')
     * @example this.$store.commit('log/clean')
     */
    clean (state, payload) {
      state.value = []
    }
  }
})
