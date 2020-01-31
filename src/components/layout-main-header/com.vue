<style lang="scss">
.layout-main-header {
  background-color: #FFF;
  border-bottom: 1px solid #E8E8E8;
  padding: $LAYOUT_MAIN_PADDING / 4 $LAYOUT_MAIN_PADDING / 2;
  .layout-main-header--button {
    @extend .radius2;
    @extend .unselect;
    padding: $LAYOUT_MAIN_PADDING / 4 $LAYOUT_MAIN_PADDING / 2;
    &:hover {
      background-color: $COLOR_BACKGROUND;
    }
    &.active {
      background-color: $COLOR_TEXT_LABEL_ACTIVE;
      color: #FFF;
    }
  }
  .layout-main-header--menu {
    .layout-main-header--menu-item {
      margin-right: $LAYOUT_MAIN_PADDING / 4;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

<template>
  <div class="layout-main-header">
    <div flex="main:justify">
      <div class="layout-main-header--menu" flex="">
        <div
          v-for="menu of menus"
          :key="menu.value"
          class="layout-main-header--button layout-main-header--menu-item"
          :class="{
            active: $route.name === menu.value
          }"
          @click="$router.push({ name: menu.value })">
          {{ menu.label }}
        </div>
      </div>
      <div class="layout-main-header--button" @click="$store.dispatch('materials/fetch')">
        <a-icon type="sync"/>
      </div>
    </div>
    <progress-download-overview/>
  </div>
</template>

<script>
export default {
  name: 'layout-main-header',
  data () {
    return {
      menus: [
        { label: '画集', value: 'album' },
        { label: '下载', value: 'download' },
        { label: '日志', value: 'log' }
      ]
    }
  }
}
</script>
