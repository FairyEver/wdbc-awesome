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
    path: []
  },
  getters: {
    /**
     * @description 资源数据 当前视图的内容
     * @example $store.getters['view/list']
     * @example this.$store.getters['view/list']
     */
    list (state, getters, rootState, rootGetters) {
      const path = state.base.value + state.path.map(e => `[${e.value}].elements`).join('')
      return get(rootGetters['materials/value'], path, [])
    }
  },
  mutations: {
    /**
     * @description 物料库访问路径 文件路径 追加
     * @param {Object} state state
     * @param {Object} payload payload
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
     * @description 物料库访问路径 文件路径 清空
     * @param {Object} state state
     * @param {Object} payload payload
     * @example $store.commit('view/clean')
     * @example this.$store.commit('view/clean')
     */
    clean (state) {
      state.path = []
    },
    /**
     * @description 物料库访问路径 文件路径 设置到某一个
     * @param {Object} state state
     * @param {Object} payload payload
     * @example $store.commit('view/pathSet')
     * @example this.$store.commit('view/pathSet')
     */
    pathSet (state, index) {
      if (index === state.path.length - 1) return
      state.path.splice(index + 1, state.path.length - (index + 1))
    }
  }
})
