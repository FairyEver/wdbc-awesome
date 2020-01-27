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
    this.id = shortid.generate()
    this.fileName = fileName
    this.done = false

    this.downloaded = 0 // 195471
    this.progress = 0 // 100
    this.speed = 0 // 81728
    this.total = 0 // 195471

    const options = {
      fileName,
      retry: { maxRetries: 3, delay: 1000 },
      override: true
    }
    const dl = new DownloaderHelper(url, destinationFolder, options)
    dl.on('end', downloadInfo => {
      this.done = true
    })
    dl.on('error', error => {
      console.log(error)
    })
    dl.on('progress', stats => {
      this.downloaded = stats.downloaded
      this.progress = Math.round(stats.progress)
      this.speed = stats.speed
      this.total = stats.total
    })

    this.dl = dl
    dl.start()
  }
  start () {
    this.dl.start()
  }
  stop () {
    this.dl.stop()
  }
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
     * @description 开始下载队列
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('download/start')
     * @example this.$store.dispatch('download/start')
     */
    async start ({ state, rootState, commit, dispatch, getters, rootGetters }) {
    },
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
