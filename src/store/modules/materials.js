// https://vuex.vuejs.org/zh/api/

export default ({ api }) => ({
  namespaced: true,
  state: {
    value: {}
  },
  getters: {
    /**
     * @description 资源数据
     * @example store.getters['materials/library']
     * @example this.$store.getters['materials/library']
     */
    library (state, getters, rootState, rootGetters) {
      return state.value.library
    }
  },
  mutations: {
    /**
     * @description 设置物料库
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('materials/set')
     * @example this.$store.commit('materials/set')
     */
    set (state, payload) {
      state.value = payload
    }
  },
  actions: {
    /**
     * @description 请求远程物料库
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('materials/fetch')
     * @example this.$store.dispatch('materials/fetch')
     */
    async fetch ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      commit('set', await api.MATERIALS_FETCH())
    }
  }
})
