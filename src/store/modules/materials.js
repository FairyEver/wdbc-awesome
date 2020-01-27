// https://vuex.vuejs.org/zh/api/

const { get } = require('lodash')

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
          if (element.elements) scan(element.elements)
          else result.push(element)
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
      const stop = await dispatch('loading/start', undefined, { root: true })
      const data = await api.MATERIALS_FETCH()
      commit('view/clean', undefined, { root: true })
      commit('set', data)
      commit('log/push', '远程物料库加载完成', { root: true })
      stop()
      await dispatch('save')
      await dispatch('download')
    },
    /**
     * @description 下载物料
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('materials/download')
     * @example this.$store.dispatch('materials/download')
     */
    async download ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      commit('log/push', '开始建立下载任务', { root: true })
      // 清空现有任务
      commit('download/clean', undefined, { root: true })
      // 遍历文件
      const files = getters.libraryFiles
      for (const file of files) {
        dispatch('download/push', {
          remoteFilename: file.url
        }, { root: true })
      }
      commit('log/push', `建立 ${getters.libraryFilesCount} 个下载任务`, { root: true })
    },
    /**
     * @description 加载本地缓存的物料库
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('materials/load')
     * @example this.$store.dispatch('materials/load')
     */
    async load ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      const data = await dispatch('local/read', { fileName: 'materials.json' }, { root: true })
      if (data) {
        commit('set', JSON.parse(data))
        commit('log/push', '本地物料库加载完成', { root: true })
      } else {
        commit('log/push', '未检测到本地物料 尝试获取远程物料库', { root: true })
        dispatch('fetch')
      }
    },
    /**
     * @description 保存远程资料库数据
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('materials/save')
     * @example this.$store.dispatch('materials/save')
     */
    async save ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      await dispatch('local/write', {
        fileName: 'materials.json',
        fileValue: JSON.stringify(state.value, null, 2)
      }, { root: true })
      commit('log/push', '本地物料库保存完成', { root: true })
    }
  }
})
