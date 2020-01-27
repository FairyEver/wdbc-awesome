<style lang="scss">
.page-album {}
</style>

<template>
  <div class="page-album">
    <a-row style="margin: 0 -10px;">
      <a-col v-for="(el, index) of $store.getters['view/list']" :key="el.id" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
        <library-element :value="el" :index="index"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'page-album'
}
</script>
