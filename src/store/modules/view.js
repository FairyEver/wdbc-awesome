// https://vuex.vuejs.org/zh/api/

import { get } from 'lodash'

export default ({ api }) => ({
  namespaced: true,
  state: {
    // 物料库访问路径 基础路径
    base: {
      label: '资源库',
      value: 'library'
    },
    // 物料库访问路径 文件路径 { label: '资源库', value: 0 }
    path: [],
    // 文件 id
    fileId: ''
  },
  getters: {
    /**
     * @description [ 当前视图的内容 ] 资源数据
     * @example $store.getters['view/list']
     * @example this.$store.getters['view/list']
     */
    list (state, getters, rootState, rootGetters) {
      const path = state.base.value + state.path.map(e => `[${e.value}].elements`).join('')
      return get(rootGetters['materials/value'], path, [])
    },
    /**
     * @description [ 当前视图的内容 ] 资源数据
     * @example $store.getters['view/file']
     * @example this.$store.getters['view/file']
     */
    file (state, getters, rootState, rootGetters) {
      if (state.fileId) {
        return getters.list.find(e => e.id === state.fileId)
      }
      return undefined
    }
  },
  mutations: {
    /**
     * @description 物料库访问路径 文件路径 追加
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('view/push')
     * @example this.$store.commit('view/push')
     */
    push (state, { label = 'Label', value = 0 }) {
      state.path.push({
        label,
        value,
        id: new Date().valueOf()
      })
    },
    /**
     * @description 清空访问信息
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('view/clean')
     * @example this.$store.commit('view/clean')
     */
    clean (state) {
      state.path = []
      state.fileId = ''
    },
    /**
     * @description 物料库访问路径 文件路径 设置到某一个
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('view/goPathIndex')
     * @example this.$store.commit('view/goPathIndex')
     */
    goPathIndex (state, index) {
      state.fileId = ''
      state.path.splice(index + 1, state.path.length - (index + 1))
    },
    /**
     * @description 设置文件 id
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('view/setFileId')
     * @example this.$store.commit('view/setFileId')
     */
    setFileId (state, id) {
      state.fileId = id
    }
  }
})
