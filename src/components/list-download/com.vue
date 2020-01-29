<style lang="scss">
.list-download {
  @extend .unselect;
  margin: 0 -16px;
  height: 200px;
  width: 250px;
  overflow: scroll;
  .list-download-item {
    @extend .nowrap;
    font-size: 12px;
    padding: 5px 16px;
  }
}
</style>

<template>
  <div class="list-download">
    <div class="list-download-item" v-for="item of $store.getters['download/list']" :key="item.id">
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
