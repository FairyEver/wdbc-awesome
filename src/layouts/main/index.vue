<style lang="scss">
.layout {
  @extend .full;
  .layout--layer {
    @extend .full;
  }
  .layout--header {
    background-color: #011528;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.50);
  }
  .layout--main {
    position: relative;
    .layout--main-view {
      @extend .full;
      padding: $LAYOUT_MAIN_PADDING;
      padding-top: $LAYOUT_HEADER_HEIGHT;
    }
    .layout--main-breadcrumb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="layout">
    <div class="layout--layer" flex="dir:top main:justify box:first">
      <div class="layout--header">
        <layout-main-header/>
      </div>
      <div class="layout--main" flex="dir:top main:justify box:first">
        <div class="layout--main-view">
          <router-view/>
        </div>
        <div class="layout--main-breadcrumb">
          <layout-main-breadcrumb/>
        </div>
      </div>
    </div>
  </div>
</template>
