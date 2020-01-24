// https://vuex.vuejs.org/zh/api/

const shortid = require('shortid')

export default ({ api }) => ({
  namespaced: true,
  state: {
    value: {}
  },
  getters: {
    /**
     * @description 是否在加载状态
     * @example store.getters['loading/value']
     * @example this.$store.getters['loading/value']
     */
    value (state, getters, rootState, rootGetters) {
      return Object.keys(state.value).reduce((result, element) => result || state.value[element], false)
    }
  },
  actions: {
    /**
     * @description 开始一个项目
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('loading/start')
     * @example this.$store.dispatch('loading/start')
     */
    async start ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      const id = shortid.generate()
      commit('start', id)
      return function () {
        setTimeout(() => {
          commit('stop', id)
        }, 300)
      }
    }
  },
  mutations: {
    /**
     * @description 开始一个新的 loading
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('name/start')
     * @example this.store.commit('name/start')
     */
    start (state, id) {
      let obj = {}
      obj[id] = true
      state.value = Object.assign({}, state.value, obj)
    },
    /**
     * @description 结束一个 loading
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('name/stop')
     * @example this.store.commit('name/stop')
     */
    stop (state, id) {
      let obj = {}
      obj[id] = false
      state.value = Object.assign({}, state.value, obj)
    }
  }
})
