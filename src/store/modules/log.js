// https://vuex.vuejs.org/zh/api/

import shortid from 'shortid'

export default ({ api }) => ({
  namespaced: true,
  state: {
    value: []
  },
  getters: {
    /**
     * @description description
     * @example store.getters['log/list']
     * @example this.$store.getters['log/list']
     */
    list (state, getters, rootState, rootGetters) {
      return state.value
    },
    /**
     * @description description
     * @example store.getters['log/length']
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
     * @example store.commit('log/push')
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
     * @param {Object} payload payload
     * @example store.commit('log/clear')
     * @example this.$store.commit('log/clear')
     */
    clear (state, payload) {
      state.value = []
    }
  }
})
