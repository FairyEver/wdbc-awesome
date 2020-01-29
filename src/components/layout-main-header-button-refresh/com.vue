<template>
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
</template>

<script>
export default {
  name: 'layout-main-header-button-refresh'
}
</script>
