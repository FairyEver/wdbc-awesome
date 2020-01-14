module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`
      }
    }
  }
}
