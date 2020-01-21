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
    // 物料库访问路径 文件路径 { label: '资源库', value: 0 }
    viewPath: []
  },
  getters: {
    /**
     * @description 资源数据
     * @example store.getters['materials/library']
     * @example this.$store.getters['materials/library']
     */
    library (state, getters, rootState, rootGetters) {
      return get(state, 'value.library', [])
    },
    /**
     * @description 资源数据 当前视图的内容
     * @example store.getters['materials/libraryView']
     * @example this.$store.getters['materials/libraryView']
     */
    libraryView (state, getters, rootState, rootGetters) {
      const path = state.viewPathBase.value + state.viewPath.map(e => `[${e.value}].elements`).join('')
      return get(state.value, path, [])
    },
    /**
     * @description 资源数据 域名
     * @example store.getters['materials/libraryBase']
     * @example this.$store.getters['materials/libraryBase']
     */
    libraryBase (state, getters, rootState, rootGetters) {
      return get(state, 'value.base', '')
    },
    /**
     * @description 资源数据 目录地址
     * @example store.getters['materials/libraryPrefix']
     * @example this.$store.getters['materials/libraryPrefix']
     */
    libraryPrefix (state, getters, rootState, rootGetters) {
      return get(state, 'value.prefix', '')
    },
    /**
     * @description 资源数据 文件列表
     * @example store.getters['materials/files']
     * @example this.$store.getters['materials/files']
     */
    files (state, getters, rootState, rootGetters) {
      let result = []
      function scan (source) {
        source.forEach(element => {
          if (element.elements) {
            scan(element.elements)
          } else {
            result.push(element)
          }
        })
      }
      scan(getters.library)
      return result
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
      state.viewPath.push({
        label,
        value,
        id: new Date().valueOf()
      })
    },
    /**
     * @description 物料库访问路径 文件路径 清空
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('materials/viewPathClean')
     * @example this.$store.commit('materials/viewPathClean')
     */
    viewPathClean (state) {
      state.viewPath = []
    },
    /**
     * @description 物料库访问路径 文件路径 设置到某一个
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('materials/viewPathToIndex')
     * @example this.$store.commit('materials/viewPathToIndex')
     */
    viewPathToIndex (state, index) {
      if (index === state.viewPath.length - 1) return
      state.viewPath.splice(index + 1, state.viewPath.length - (index + 1))
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
      commit('log/push', '远程物料库加载完成', { root: true })
    }
  }
})
