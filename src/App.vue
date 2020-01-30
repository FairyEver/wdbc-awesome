<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
  background-color: $COLOR_BACKGROUND !important;
  height: 100vh;
  position: relative;
}
</style>

<template>
  <router-view/>
</template>

<script>
export default {
  async created () {
    // 加载本地数据
    await this.$store.dispatch('materials/load')
  }
}
</script>
