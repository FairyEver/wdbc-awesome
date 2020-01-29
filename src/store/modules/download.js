// https://vuex.vuejs.org/zh/api/

// https://www.npmjs.com/package/node-downloader-helper

import byteTo from '@/utils/byte.js'

const shortid = require('shortid')
const path = require('path')
const { app } = require('electron').remote
const { DownloaderHelper } = require('node-downloader-helper')
const mkdir = require('@/utils/mkdir')

/**
 * @description 下载任务的一项
 */
class Task {
  constructor ({
    url,
    destinationFolder,
    fileName,
    onSpeed = function (speed) { console.log(speed) },
    onEnd = function (downloadInfo) { console.log(downloadInfo) }
  }) {
    this.id = shortid.generate()
    this.fileName = fileName

    this.downloaded = 0
    this.progress = 0
    this.speed = 0
    this.total = 0

    // [ downloader.state ]
    // -> IDLE
    // -> STARTED
    // -> DOWNLOADING
    // -> PAUSED
    // -> RESUMED
    // -> STOPPED
    // -> FINISHED
    // -> FAILED
    // -> RETRY

    this.downloader = new DownloaderHelper(url, destinationFolder, {
      fileName,
      retry: { maxRetries: 3, delay: 1000 },
      override: true
    })

    // 下载完成
    this.downloader.on('end', downloadInfo => {
      onEnd(downloadInfo)
    })
    // 下载失败
    this.downloader.on('error', error => {
      console.log(error)
    })
    // 下载中
    this.downloader.on('progress', stats => {
      this.progress = Math.round(stats.progress)
      this.downloaded = byteTo(stats.downloaded)
      this.total = byteTo(stats.total)
      onSpeed(stats.speed)
    })
  }
  start () {
    this.downloader.start()
  }
  stop () {
    this.downloader.stop()
  }
}

export default ({ api }) => ({
  namespaced: true,
  state: {
    // 下载列表
    value: [],
    // 整体下载速度
    speed: 0
  },
  getters: {
    /**
     * @description 是否正在下载
     * @example $store.getters['download/playing']
     * @example this.$store.getters['download/playing']
     */
    playing (state, getters, rootState, rootGetters) {
      return true
    },
    /**
     * @description 下载列表
     * @example $store.getters['download/list']
     * @example this.$store.getters['download/list']
     */
    list (state, getters, rootState, rootGetters) {
      return state.value
    },
    /**
     * @description 格式化后的速度
     * @example $store.getters['download/speed']
     * @example this.$store.getters['download/speed']
     */
    speed (state, getters, rootState, rootGetters) {
      return `${byteTo(state.speed)}/s`
    },
    /**
     * @description 整体进度
     * @example $store.getters['download/progress']
     * @example this.$store.getters['download/progress']
     */
    progress (state, getters, rootState, rootGetters) {
      if (getters.length === 0) return 0
      return Math.round(getters.countFinished / getters.length * 100)
    },
    /**
     * @description [ 任务数量 ] 全部
     * @example $store.getters['download/countAll']
     * @example this.$store.getters['download/countAll']
     */
    countAll (state, getters, rootState, rootGetters) {
      return state.value.length
    },
    /**
     * @description [ 任务数量 ] 等待中
     * @example $store.getters['download/countIdle']
     * @example this.$store.getters['download/countIdle']
     */
    countIdle (state, getters, rootState, rootGetters) {
      return state.value.filter(e => e.downloader.state === 'IDLE').length
    },
    /**
     * @description [ 任务数量 ] 已完成
     * @example $store.getters['download/countFinished']
     * @example this.$store.getters['download/countFinished']
     */
    countFinished (state, getters, rootState, rootGetters) {
      return state.value.filter(e => e.downloader.state === 'FINISHED').length
    }
  },
  mutations: {
    /**
     * @description 清空下载任务
     * @param {Object} state state
     * @param {Object} payload payload
     * @example $store.commit('download/clean')
     * @example this.$store.commit('download/clean')
     */
    clean (state, payload) {
      state.value = []
    },
    /**
     * @description 增加新的下载任务
     * @param {Object} state state
     * @param {Object} payload payload
     * @example $store.commit('download/push')
     * @example this.$store.commit('download/push')
     */
    push (state, payload) {
      state.value.push(payload)
    },
    /**
     * @description 设置下载速度
     * @param {Object} state state
     * @param {Object} payload payload
     * @example $store.commit('download/setSpeed')
     * @example this.$store.commit('download/setSpeed')
     */
    setSpeed (state, payload) {
      state.speed = payload
    }
  },
  actions: {
    /**
     * @description 开始下载队列 | 进行下一个
     * @param {Object} context context
     * @param {Object} payload payload
     * @example $store.dispatch('download/start')
     * @example this.$store.dispatch('download/start')
     */
    async start ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      // 找到没有下载完成的任务 index
      const index = state.value.findIndex(e => e.downloader.state !== 'FINISHED')
      if (index >= 0) {
        state.value[index].start()
      }
    },
    /**
     * @description 增加新的下载任务
     * @param {Object} context context
     * @param {Object} payload payload
     * @example $store.dispatch('download/push')
     * @example this.$store.dispatch('download/push')
     */
    async push (
      { state, rootState, commit, dispatch, getters, rootGetters },
      { remoteFilename = '' } = {}
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
        fileName: remoteFilename,
        onSpeed: function (speed) {
          if (speed) {
            commit('setSpeed', speed)
          }
        },
        onEnd: function (downloadInfo) {
          commit('materials/setFilePath', downloadInfo, { root: true })
          dispatch('materials/save', undefined, { root: true })
          if (getters.countIdle === 0) {
            commit('setSpeed', 0)
          }
          dispatch('start')
        }
      }))
    }
  }
})
