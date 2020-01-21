<style lang="scss">
.log-list {
  @extend .unselect;
  margin: 0 -16px;
  height: 200px;
  width: 200px;
  overflow: scroll;
  .log-list-item {
    @extend .nowrap;
    font-size: 12px;
    padding: 5px 16px;
    &:hover {
      background-color: $COLOR_TEXT_LABEL_ACTIVE;
      color: #FFF;
    }
  }
}
</style>

<template>
  <div class="log-list">
    <div
      class="log-list-item"
      v-for="item of $store.getters['log/list']"
      :key="item.id">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'log-list'
}
</script>
