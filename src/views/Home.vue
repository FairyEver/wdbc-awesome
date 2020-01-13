<template>
  <div class="home">
    <img ref="img" alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'home',
  mounted () {
    this.$refs.img.ondragstart = (event) => {
      event.preventDefault()
      ipcRenderer.send('ondragstart', '/path/to/item')
    }
  }
}
</script>
