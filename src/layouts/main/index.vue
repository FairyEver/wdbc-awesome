<style lang="scss">
.layout {
  @extend .full;
  .layout--layer {
    @extend .full;
    .layout--main {
      position: relative;
    }
  }
}
</style>

<template>
  <div class="layout">
    <div class="layout--layer" flex="dir:top main:justify">
      <div class="layout--header" flex-box="0">
        <layout-main-header/>
      </div>
      <div class="layout--main" flex-box="1">
        <transition name="fade-router">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>
