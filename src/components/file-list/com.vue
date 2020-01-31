<style lang="scss">
.file-list {}
</style>

<template>
  <a-row class="file-list" style="margin: 0 -10px;">
    <a-col v-for="(el, index) of $store.getters['view/list']" :key="el.id" v-bind="colSetting">
      <library-element :value="el" :index="index"/>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'file-list',
  data () {
    return {
      colSetting: {
        xs: 8,
        sm: 6,
        md: 4,
        lg: 3,
        xl: 2
      }
    }
  }
}
</script>
