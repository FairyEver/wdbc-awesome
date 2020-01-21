// https://vuex.vuejs.org/zh/api/

import { get } from 'lodash'

export default ({ api }) => ({
  namespaced: true,
  state: {
    // 物料库
    //  - base: ''
    //  - library: []
    //  - prefix: ''
    value: {}
  },
  getters: {
    /**
     * @description 数据
     * @example store.getters['materials/value']
     * @example this.$store.getters['materials/value']
     */
    value (state, getters, rootState, rootGetters) {
      return get(state, 'value', {
        base: '',
        library: [],
        prefix: ''
      })
    },
    /**
     * @description 资源数据
     * @example store.getters['materials/library']
     * @example this.$store.getters['materials/library']
     */
    library (state, getters, rootState, rootGetters) {
      return get(state, 'value.library', [])
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
     * @example store.getters['materials/libraryFiles']
     * @example this.$store.getters['materials/libraryFiles']
     */
    libraryFiles (state, getters, rootState, rootGetters) {
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
    },
    /**
     * @description 资源数据 文件数量
     * @example store.getters['materials/libraryFilesCount']
     * @example this.$store.getters['materials/libraryFilesCount']
     */
    libraryFilesCount (state, getters, rootState, rootGetters) {
      return getters.libraryFiles.length
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
      commit('log/push', '远程物料库加载完成', { root: true })
    }
  }
})
