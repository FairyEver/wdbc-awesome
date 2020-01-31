<style lang="scss">
.list-download {
  @extend .unselect;
  .list-download-item {
    @extend .nowrap;
    font-size: 12px;
  }
}
</style>

<template>
  <div class="list-download">
    <div
      class="list-download-item"
      v-for="item of $store.getters['download/list']"
      :key="item.id">
      <div flex="main:justify">
        <div>{{ item.fileName }}</div>
        <div>{{ item.downloaded }} / {{ item.total }}</div>
      </div>
      <a-progress :percent="item.progress" size="small" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-download'
}
</script>
