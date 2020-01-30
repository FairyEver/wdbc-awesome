export default {
  install (Vue) {
    Vue.prototype.$publicPath = process.env.BASE_URL
  }
}
