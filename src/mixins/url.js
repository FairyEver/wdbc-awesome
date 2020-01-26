export default {
  methods: {
    /**
     * @description 计算文件真实的资源地址
     */
    url (url = '', def = '', size = 0) {
      if (!url) return def
      const base = this.$store.getters['materials/libraryBase']
      const prefix = this.$store.getters['materials/libraryPrefix']
      const imageView2 = size === 0 ? '' : `?imageView2/2/w/${size}/h/${size}`
      return base + prefix + url + imageView2
    }
  }
}
