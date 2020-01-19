// https://vuex.vuejs.org/zh/api/
import { get } from 'lodash'

export default ({ api }) => ({
  namespaced: true,
  state: {
    // 物料库
    value: {},
    // 物料库访问路径 基础路径
    viewPathBase: {
      label: '资源库',
      value: 'library'
    },
    // 物料库访问路径 文件路径
    viewPath: [
      // {
      //   label: '资源库',
      //   value: 0
      // }
    ]
  },
  getters: {
    /**
     * @description 资源数据
     * @example store.getters['materials/library']
     * @example this.$store.getters['materials/library']
     */
    library (state, getters, rootState, rootGetters) {
      return state.value.library || []
    },
    /**
     * @description 资源数据 当前视图的内容
     * @example store.getters['materials/libraryView']
     * @example this.$store.getters['materials/libraryView']
     */
    libraryView (state, getters, rootState, rootGetters) {
      const path = state.viewPathBase.value + state.viewPath.map(e => `[${e.value}].elements`).join('')
      return get(state.value, path)
    },
    /**
     * @description 资源数据域名
     * @example store.getters['materials/libraryBase']
     * @example this.$store.getters['materials/libraryBase']
     */
    libraryBase (state, getters, rootState, rootGetters) {
      return state.value.base || ''
    },
    /**
     * @description 资源数据目录地址
     * @example store.getters['materials/libraryPrefix']
     * @example this.$store.getters['materials/libraryPrefix']
     */
    libraryPrefix (state, getters, rootState, rootGetters) {
      return state.value.prefix || ''
    }
  },
  mutations: {
    /**
     * @description 物料库访问路径 文件路径 追加
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('materials/viewPathPush')
     * @example this.$store.commit('materials/viewPathPush')
     */
    viewPathPush (state, { label = 'Label', value = 0 }) {
      state.viewPath.push({ label, value })
    },
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
