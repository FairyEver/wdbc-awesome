<style lang="scss">
.page-album {}
</style>

<template>
  <div class="page-album">
    <a-breadcrumb class="is-mb-10">
      <a-breadcrumb-item>
        <a-icon type="home"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item @click.native="$store.commit('view/clean')" href="">
        {{ $store.state.view.base.label }}
      </a-breadcrumb-item>
      <a-breadcrumb-item
        v-for="(item, index) of $store.state.view.path"
        :key="item.id"
        @click.native="$store.commit('view/pathSet', index)"
        href="">
        {{ item.label }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-row style="margin: 0 -10px;">
      <a-col v-for="(el, index) of $store.getters['view/list']" :key="el.id" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
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
