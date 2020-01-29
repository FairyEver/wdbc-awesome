<style lang="scss">
.list-log {
  @extend .unselect;
  margin: 0 -16px;
  height: 300px;
  width: 240px;
  overflow: scroll;
  .list-log-item {
    @extend .nowrap;
    font-size: 12px;
    padding: 5px 16px;
    opacity: 0.4;
    &.index-1 {
      opacity: 1.0;
      font-weight: bolder;
    }
    &.index-2 { opacity: 0.9; }
    &.index-3 { opacity: 0.8; }
    &.index-4 { opacity: 0.7; }
    &.index-5 { opacity: 0.6; }
    &.index-6 { opacity: 0.5; }
    &:hover {
      background-color: $COLOR_TEXT_LABEL_ACTIVE;
      color: #FFF;
    }
  }
}
</style>

<template>
  <div class="list-log">
    <div
      class="list-log-item"
      v-for="(item, index) of $store.getters['log/list']"
      :key="item.id"
      :class="`index-${index + 1}`">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-log'
}
</script>
