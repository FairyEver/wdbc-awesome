<style lang="scss">
.download-list {
  @extend .unselect;
  margin: 0 -16px;
  height: 300px;
  width: 300px;
  overflow: scroll;
  .download-list-item {
    @extend .nowrap;
    font-size: 12px;
    padding: 5px 16px;
  }
}
</style>

<template>
  <div class="download-list">
    <div class="download-list-item" v-for="item of $store.getters['download/list']" :key="item.id">
      <div>
        <div>{{ item.fileName }}</div>
        <div>{{ item.downloaded }} / {{ item.total }}</div>
      </div>
      <a-progress :percent="item.progress" size="small" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'download-list'
}
</script>
