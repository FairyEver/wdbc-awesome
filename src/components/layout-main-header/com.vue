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
      <layout-main-header-button icon="download" :count="$store.getters['download/lengthWait']">
        <div slot="title" flex="main:justify">
          <span>下载</span>
          <span>{{ $store.getters['download/speed'] }}</span>
        </div>
        <download-list slot="content"/>
        <div slot="footer" flex="main:right">
          <a-button icon="delete" type="danger" @click="$store.commit('download/clean')">
            清空
          </a-button>
        </div>
      </layout-main-header-button>
      <layout-main-header-button icon="sync" :spin="$store.getters['loading/value']">
        <div slot="title">刷新数据</div>
        <div slot="content">
          此操作将重新请求服务器数据<br>
          将刷新本地资源列表
        </div>
        <a-button
          slot="footer"
          type="primary"
          icon="sync"
          :loading="$store.getters['loading/value']"
          @click="$store.dispatch('materials/fetch')"
          block>
          刷新数据
        </a-button>
      </layout-main-header-button>
      <layout-main-header-button icon="bell" :count="$store.getters['log/length']" dot>
        <div slot="title">消息</div>
        <log-list slot="content"/>
        <div slot="footer" flex="main:right">
          <a-button icon="delete" type="danger" @click="$store.commit('log/clean')">
            清空
          </a-button>
        </div>
      </layout-main-header-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-main-header'
}
</script>
