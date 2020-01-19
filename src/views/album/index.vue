<style lang="scss">
.page-album {}
</style>

<template>
  <div class="page-album">
    <a-breadcrumb class="is-mb-20">
      <a-breadcrumb-item>
        <a-icon type="home"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        {{ $store.state.materials.viewPathBase.label }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-row>
      <a-col
        v-for="(el, index) of $store.getters['materials/libraryView']"
        :key="el.id"
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="3">
        <library-element :value="el" :index="index"/>
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
