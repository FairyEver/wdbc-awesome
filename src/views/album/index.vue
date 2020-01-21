<style lang="scss">
.page-album {}
</style>

<template>
  <div class="page-album">
    <a-breadcrumb class="is-mb-10">
      <a-breadcrumb-item>
        <a-icon type="home"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item @click.native="$store.commit('materials/viewPathClean')" href="">
        {{ $store.state.materials.viewPathBase.label }}
      </a-breadcrumb-item>
      <a-breadcrumb-item
        v-for="(item, index) of $store.state.materials.viewPath"
        :key="item.id"
        @click.native="$store.commit('materials/viewPathToIndex', index)"
        href="">
        {{ item.label }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-row style="margin: 0 -10px;">
      <a-col v-for="(el, index) of $store.getters['materials/libraryView']" :key="el.id" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
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
