<template>
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
</template>

<script>
export default {
  name: 'layout-main-header-button-download'
}
</script>
