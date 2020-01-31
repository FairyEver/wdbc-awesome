<style lang="scss">
.overview-hdd {
  @extend .unselect;
  @extend .card;
  $colorHdd: #57C22D;
  overflow: hidden;
  padding: 10px;
  .overview-hdd--item {
    @extend .radius1;
    height: 10px;
    width: 10px;
    float: left;
    background-color: $COLOR_BACKGROUND;
    margin: 1px;
    &.is-hdd {
      background-color: $colorHdd;
    }
  }
  .overview-hdd--title {
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 10px - 2px;
    .overview-hdd--title-is-hdd {
      color: $colorHdd;
    }
  }
}
</style>

<template>
  <div class="overview-hdd">
    <div class="overview-hdd--title">
      <span class="overview-hdd--title-is-hdd">本地 {{ libraryLocalFilesCount }}</span> / 远端 {{ libraryFilesCount }}
    </div>
    <div
      v-for="n in libraryFilesCount"
      :key="n"
      class="overview-hdd--item"
      :class="{
        'is-hdd': n <= libraryLocalFilesCount
      }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'overview-hdd',
  computed: {
    libraryFilesCount () {
      return this.$store.getters['materials/libraryFilesCount']
    },
    libraryLocalFilesCount () {
      return this.$store.getters['materials/libraryLocalFilesCount']
    }
  }
}
</script>
