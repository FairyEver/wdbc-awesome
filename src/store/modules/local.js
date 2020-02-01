// https://vuex.vuejs.org/zh/api/

const fs = require('fs')
const path = require('path')
const write = require('@/utils/write')
const mkdir = require('@/utils/mkdir')
const { app } = require('electron').remote

export default ({ api }) => ({
  namespaced: true,
  actions: {
    /**
     * @description 写入文件
     * @param {Object} context context
     * @param {Any} payload payload
     * @example $store.dispatch('local/write')
     * @example this.$store.dispatch('local/write')
     */
    async write (
      { state, rootState, commit, dispatch, getters, rootGetters },
      { filePath = app.getPath('userData'), fileName = '', fileValue = '' }
    ) {
      write(filePath, fileName, fileValue)
    },
    /**
     * @description 读取文件
     * @param {Object} context context
     * @param {Any} payload payload
     * @example $store.dispatch('local/read')
     * @example this.$store.dispatch('local/read')
     */
    async read (
      { state, rootState, commit, dispatch, getters, rootGetters },
      { filePath = app.getPath('userData'), fileName = '', defaultValue = '' }
    ) {
      return new Promise((resolve, reject) => {
        fs.readFile(path.join(filePath, fileName), { encoding: 'utf-8' }, (err, data) => {
          if (err) return resolve(defaultValue)
          resolve(data)
        })
      })
    },
    /**
     * @description 确保文件夹存在
     * @param {Object} context context
     * @param {String} filePath 文件夹路径
     * @example $store.dispatch('local/mkdir')
     * @example this.$store.dispatch('local/mkdir')
     */
    async mkdir ({ state, rootState, commit, dispatch, getters, rootGetters }, filePath) {
      await mkdir(filePath)
    },
    /**
     * @description 确保 userData 中文件夹存在
     * @param {Object} context context
     * @param {Array} folderArray 文件夹路径数组
     * @example $store.dispatch('local/mkdirUserData')
     * @example this.$store.dispatch('local/mkdirUserData')
     */
    async mkdirUserData ({ state, rootState, commit, dispatch, getters, rootGetters }, folderArray) {
      await mkdir(path.join(app.getPath('userData'), ...folderArray))
    }
  }
})
