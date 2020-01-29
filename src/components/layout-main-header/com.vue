<style lang="scss">
.layout-main-header {
  @extend .unselect;
  padding: 0 $LAYOUT_MAIN_PADDING;
}
</style>

<template>
  <div class="layout-main-header" flex="main:justify cross:center">
    <a-menu mode="horizontal" theme="dark">
      <a-menu-item key="mail">
        <a-icon type="appstore"/>画廊
      </a-menu-item>
      <a-menu-item key="app">
        <a-icon type="setting"/>设置
      </a-menu-item>
    </a-menu>
    <div flex="main:justify">
      <layout-main-header-button-download/>
      <layout-main-header-button-refresh/>
      <layout-main-header-button-log/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-main-header'
}
</script>
