<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
  background-color: $COLOR_BACKGROUND !important;
  .layout {
    .layout-header {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      z-index: 999;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
      background-color: #011528;
      .layout-header-button {
        height: $LAYOUT_HEADER_HEIGHT;
        width: $LAYOUT_HEADER_HEIGHT;
        color: $COLOR_HEADER_TEXT_NORMAL;
        user-select: none;
        cursor: pointer;
        &:hover {
          color: $COLOR_HEADER_TEXT_ACTIVE;
        }
      }
    }
    .layout-main {
      padding: $LAYOUT_MAIN_PADDING;
      padding-top: $LAYOUT_HEADER_HEIGHT + $LAYOUT_MAIN_PADDING;
    }
  }
}
</style>

<template>
  <div class="layout">
    <div class="layout-header" flex="main:justify cross:center">
      <a-menu mode="horizontal" theme="dark">
        <a-menu-item key="mail">
          <a-icon type="appstore"/>画廊
        </a-menu-item>
        <a-menu-item key="app">
          <a-icon type="setting"/>设置
        </a-menu-item>
      </a-menu>
      <div flex="main:justify">
        <div class="layout-header-button" flex="main:center cross:center">
          <a-icon type="sync" spin/>
        </div>
        <div class="layout-header-button" flex="main:center cross:center">
          <a-icon type="bell"/>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <a-card title="Small size card">
        <router-view/>
      </a-card>
    </div>
  </div>
</template>
