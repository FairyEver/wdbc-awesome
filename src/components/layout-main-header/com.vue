<style lang="scss">
.layout-main-header {
  @extend .unselect;
  padding-right: $LAYOUT_MAIN_PADDING;
}
</style>

<template>
  <div class="layout-main-header" flex="main:justify cross:center">
    <layout-main-header-menu/>
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
