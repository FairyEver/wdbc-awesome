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
  async mounted () {
    this.$refs.img.ondragstart = (event) => {
      event.preventDefault()
      ipcRenderer.send('ondragstart', '/path/to/item')
    }
    const result = await this.$api.LIBRARY_LOAD()
    console.log(result)
  }
}
</script>
