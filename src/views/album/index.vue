<style lang="scss" scoped>
.page-album {}
</style>

<template>
  <div class="page-album">
    <img ref="img" alt="Vue logo" src="@/assets/logo.png">
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'page-album',
  mounted () {
    this.$refs.img.ondragstart = (event) => {
      event.preventDefault()
      ipcRenderer.send('ondragstart', '/path/to/item')
    }
  }
}
</script>
