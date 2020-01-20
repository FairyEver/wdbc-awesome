import store from '@/store'

export default {
  install (Vue) {
    Vue.prototype.$url = (url = '', def = '') => {
      if (!url) return def
      return store.getters['materials/libraryBase'] + store.getters['materials/libraryPrefix'] + url
    }
  }
}
