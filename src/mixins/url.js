export default {
  methods: {
    /**
     * @description 计算文件真实的资源地址
     */
    url (url = '', def = '') {
      if (!url) return def
      return this.$store.getters['materials/libraryBase'] + this.$store.getters['materials/libraryPrefix'] + url
    }
  }
}
