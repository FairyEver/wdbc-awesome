<style lang="scss">
.layout {
  @extend .full;
  .layout--layer {
    @extend .full;
  }
  .layout--header {
    background-color: #011528;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
  }
  .layout--main {
    position: relative;
  }
}
</style>

<template>
  <div class="layout">
    <div class="layout--layer" flex="dir:top main:justify box:first">
      <div class="layout--header">
        <layout-main-header/>
      </div>
      <div class="layout--main">
        <router-view/>
      </div>
    </div>
  </div>
</template>
