// https://vuex.vuejs.org/zh/api/

// https://www.npmjs.com/package/node-downloader-helper

const shortid = require('shortid')
const path = require('path')
const { app } = require('electron').remote
const { DownloaderHelper } = require('node-downloader-helper')
const mkdir = require('@/utils/mkdir')

/**
 * @description 下载任务的一项
 */
class Task {
  constructor ({ url, destinationFolder, fileName }) {
    const options = {
      fileName,
      retry: { maxRetries: 3, delay: 1000 },
      override: true
    }
    const dl = new DownloaderHelper(url, destinationFolder, options)
    dl.on('end', () => console.log('Download Completed'))
    dl.on('progress', (stats) => console.log(stats))
    // 设置自身属性
    this.id = shortid.generate()
    this.dl = dl
    this.progress = 0
  }
  start () {
    this.dl.start()
  }
  stop () {}
}

export default ({ api }) => ({
  namespaced: true,
  state: {
    value: []
  },
  getters: {
    /**
     * @description description
     * @example store.getters['download/list']
     * @example this.$store.getters['download/list']
     */
    list (state, getters, rootState, rootGetters) {
      return state.value
    },
    /**
     * @description 任务数量
     * @example store.getters['download/length]
     * @example this.store.getters['download/length]
     */
    length (state, getters, rootState, rootGetters) {
      return state.value.length
    }
  },
  mutations: {
    /**
     * @description 清空下载任务
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('download/clean')
     * @example this.store.commit('download/clean')
     */
    clean (state, payload) {
      state.value = []
    },
    /**
     * @description 增加新的下载任务
     * @param {Object} state state
     * @param {Object} payload payload
     * @example store.commit('download/push')
     * @example this.store.commit('download/push')
     */
    push (state, payload) {
      state.value.push(payload)
    }
  },
  actions: {
    /**
     * @description 增加新的下载任务
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('download/push')
     * @example this.$store.dispatch('download/push')
     */
    async push (
      { state, rootState, commit, dispatch, getters, rootGetters },
      {
        remoteFilename = ''
      } = {}
    ) {
      // 计算图片的真实下载地址
      const libraryBase = rootGetters['materials/libraryBase']
      const libraryPrefix = rootGetters['materials/libraryPrefix']
      const url = libraryBase + libraryPrefix + remoteFilename
      // 计算下载目录
      const destinationFolder = path.join(app.getPath('userData'), ...[ 'library' ])
      await mkdir(destinationFolder)
      // 建立下载队列
      commit('push', new Task({
        url,
        destinationFolder,
        fileName: remoteFilename
      }))
    }
  }
})
