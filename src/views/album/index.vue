<style lang="scss">
.page-album {}
</style>

<template>
  <div class="page-album">
    <a-row :gutter="10">
      <a-col
        v-for="el of $store.getters['materials/library']"
        :key="el.id"
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="3"
        class="is-mb-10">
        <img class="square" :style="{ backgroundImage: `url(${$url(el.cover)})` }"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
export default {
  name: 'page-album',
  async mounted () {
    // this.$refs.img.ondragstart = (event) => {
    //   event.preventDefault()
    //   ipcRenderer.send('ondragstart', '/path/to/item')
    // }
    this.$store.dispatch('materials/fetch')
  },
  methods: {
  }
}
</script>
