// https://vuex.vuejs.org/zh/api/

export default ({ api }) => ({
  namespaced: true,
  state: {
    stateDemo: 'state demo'
  },
  getters: {
    /**
     * @description description
     * @example store.getters['library/getterDemo]
     * @example this.store.getters['library/getterDemo]
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
     * @example store.commit('library/mutationDemo')
     * @example this.store.commit('library/mutationDemo')
     */
    mutationDemo (state, payload) {}
  },
  actions: {
    /**
     * @description description
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('library/actionDemo')
     * @example this.store.dispatch('library/actionDemo')
     */
    async actionDemo ({ state, rootState, commit, dispatch, getters, rootGetters }) {}
  }
})
