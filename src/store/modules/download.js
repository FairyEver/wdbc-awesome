// https://vuex.vuejs.org/zh/api/

import Task from '@/class/Task.js'

const path = require('path')
const { app } = require('electron').remote

export default ({ api }) => ({
  namespaced: true,
  state: {
    // 下载列表
    list: [],
    // 整体下载速度
    speed: 0
  },
  getters: {
    /**
     * @description 整体速度 已经格式化
     * @example $store.getters['download/speed']
     * @example this.$store.getters['download/speed']
     */
    speed (state, getters, rootState, rootGetters) {
      return state.speed
    },
    /**
     * @description 整体进度
     * @example $store.getters['download/progress']
     * @example this.$store.getters['download/progress']
     */
    progress (state, getters, rootState, rootGetters) {
      if (getters.length === 0) return 0
      return Math.round(getters.countFinished / getters.countAll * 100)
    },
    /**
     * @description [ 任务数量 ] 全部
     * @example $store.getters['download/countAll']
     * @example this.$store.getters['download/countAll']
     */
    countAll (state, getters, rootState, rootGetters) {
      return state.list.length
    },
    /**
     * @description [ 任务数量 ] 未开始
     * @example $store.getters['download/countIdle']
     * @example this.$store.getters['download/countIdle']
     */
    countIdle (state, getters, rootState, rootGetters) {
      return state.list.filter(e => e.downloader.state === 'IDLE').length
    },
    /**
     * @description [ 任务数量 ] 已完成
     * @example $store.getters['download/countFinished']
     * @example this.$store.getters['download/countFinished']
     */
    countFinished (state, getters, rootState, rootGetters) {
      return state.list.filter(e => e.downloader.state === 'FINISHED').length
    }
  },
  mutations: {
    /**
     * @description [ 下载列表 ] 设置下载列表 覆盖之前的
     * @param {Object} state state
     * @param {Array} list 下载任务列表
     * @example $store.commit('download/listSet')
     * @example this.$store.commit('download/listSet')
     */
    listSet (state, list) {
      state.list = list
    },
    /**
     * @description [ 下载列表 ] 追加新的下载任务
     * @param {Object} state state
     * @param {Task} task 下载任务
     * @example $store.commit('download/listPush')
     * @example this.$store.commit('download/listPush')
     */
    listPush (state, task) {
      state.list.push(task)
    },
    /**
     * @description [ 下载速度 ] 设置下载速度
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('download/speedSet')
     * @example this.$store.commit('download/speedSet')
     */
    speedSet (state, payload) {
      state.speed = payload
    }
  },
  actions: {
    /**
     * @description [ 下载队列 ] 开始下一个下载任务
     * @param {Object} context context
     * @param {Any} payload payload
     * @example $store.dispatch('download/startNextTask')
     * @example this.$store.dispatch('download/startNextTask')
     */
    async startNextTask ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      // 找到没有下载完成的任务 index
      const index = state.list.findIndex(e => e.downloader.state !== 'FINISHED')
      if (index >= 0) {
        state.list[index].start()
      }
    },
    /**
     * @description 增加新的下载任务
     * @param {Object} context context
     * @param {Any} payload payload
     * @example $store.dispatch('download/listPushImageTask')
     * @example this.$store.dispatch('download/listPushImageTask')
     */
    async listPushImageTask (
      { state, rootState, commit, dispatch, getters, rootGetters },
      { remoteFilename = '' } = {}
    ) {
      // 计算图片的真实下载地址
      const libraryBase = rootGetters['materials/libraryBase']
      const libraryPrefix = rootGetters['materials/libraryPrefix']
      const url = libraryBase + libraryPrefix + remoteFilename
      // 计算下载目录
      const destinationFolder = path.join(app.getPath('userData'), ...[ 'library' ])
      await dispatch('local/mkdir', destinationFolder, { root: true })
      // 建立下载队列
      commit('listPush', new Task({
        url,
        destinationFolder,
        fileName: remoteFilename,
        onProgress: function (stats) {
          // 将这个任务的速度提交到全局
          if (stats.speed) commit('speedSet', stats.speed)
        },
        onEnd: async function (downloadInfo) {
          // 将图片的本地地址设置到资源库
          commit('materials/setImageFilePath', downloadInfo, { root: true })
          // 保存资源库
          await dispatch('materials/save', undefined, { root: true })
          // 开始下一个
          await dispatch('start')
        }
      }))
    }
  }
})
