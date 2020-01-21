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
      padding: 0 $LAYOUT_MAIN_PADDING;
      .layout-header-button {
        height: $LAYOUT_HEADER_HEIGHT;
        width: $LAYOUT_HEADER_HEIGHT;
        color: $COLOR_HEADER_TEXT_NORMAL;
        user-select: none;
        cursor: pointer;
        &:hover {
          background-color: $COLOR_PRIMARY;
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
        <layout-default-header-button icon="database">
          <div slot="title">总览</div>
          <div slot="content">
            <a-icon type="file" /> x {{ $store.getters['materials/libraryFilesCount'] }}
          </div>
        </layout-default-header-button>
        <layout-default-header-button icon="sync">
          <div slot="title">刷新数据</div>
          <div slot="content">
            此操作将重新请求服务器数据<br>
            将刷新本地资源列表
          </div>
          <a-button slot="footer" type="primary" icon="sync" block>刷新数据</a-button>
        </layout-default-header-button>
        <layout-default-header-button icon="bell" :count="$store.getters['log/length']">
          <div slot="title">消息</div>
          <log-list slot="content"/>
          <div slot="footer" flex="main:right">
            <a-button icon="delete" type="danger" @click="$store.commit('log/clear')">
              清空
            </a-button>
          </div>
        </layout-default-header-button>
      </div>
    </div>
    <div class="layout-main">
      <router-view/>
    </div>
  </div>
</template>
