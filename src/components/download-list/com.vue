<style lang="scss">
.download-list {
  @extend .unselect;
  margin: 0 -16px;
  height: 300px;
  width: 240px;
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
      <a-progress :percent="30" size="small" />
      <!-- <a-progress :percent="50" size="small" status="active" />
      <a-progress :percent="70" size="small" status="exception" />
      <a-progress :percent="100" size="small" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'download-list'
}
</script>
