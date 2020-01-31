<style lang="scss">
.list-download {
  @extend .unselect;
}
</style>

<template>
  <div class="list-download">
    <progress-bar
      v-for="item of $store.getters['download/list']"
      :key="item.id"
      :name="item.fileName"
      :complete="item.downloaded"
      :total="item.total"
      :percent="item.progress"/>
  </div>
</template>

<script>
export default {
  name: 'list-download'
}
</script>
