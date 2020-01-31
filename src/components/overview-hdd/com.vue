<style lang="scss">
.overview-hdd {
  overflow: hidden;
  .overview-hdd--item {
    @extend .radius1;
    height: 10px;
    width: 10px;
    float: left;
    background-color: rgba(#000, .1);
    margin: 1px;
    &.is-hdd {
      background-color: #57C22D;
    }
  }
}
</style>

<template>
  <div class="overview-hdd">
    <div
      v-for="n in $store.getters['materials/libraryFilesCount']"
      :key="n"
      class="overview-hdd--item"
      :class="{
        'is-hdd': n <= $store.getters['materials/libraryLocalFilesCount']
      }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'overview-hdd'
}
</script>
