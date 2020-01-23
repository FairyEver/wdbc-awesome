// https://vuex.vuejs.org/zh/api/

const fs = require('fs')
const path = require('path')
const write = require('@/utils/write')
const { app } = require('electron').remote

export default ({ api }) => ({
  namespaced: true,
  actions: {
    /**
     * @description 写入文件
     * @param {Object} context context
     * @param {Object} payload payload
     * @example store.dispatch('local/write')
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
     * @param {Object} payload payload
     * @example store.dispatch('local/read')
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
    }
  }
})
