import store from '@/store'

export default {
  install (Vue) {
    Vue.prototype.$url = url => {
      return store.getters['materials/libraryBase'] + store.getters['materials/libraryPrefix'] + url
    }
  }
}
