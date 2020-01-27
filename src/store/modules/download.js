// https://vuex.vuejs.org/zh/api/

export default ({ api }) => ({
  namespaced: true,
  state: {
    value: 'state demo'
  },
  getters: {
    /**
     * @description description
     * @example store.getters['download/getterDemo]
     * @example this.store.getters['download/getterDemo]
     */
    getterDemo (state, getters, rootState, rootGetters) {
      return state.stateDemo
    }
  },
  mutations: {
    /**
     * @description description
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('download/mutationDemo')
     * @example this.store.commit('download/mutationDemo')
     */
    mutationDemo (state, payload) {}
  },
  actions: {
    /**
     * @description description
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('download/actionDemo')
     * @example this.store.dispatch('download/actionDemo')
     */
    async actionDemo ({ state, rootState, commit, dispatch, getters, rootGetters }) {}
  }
})
