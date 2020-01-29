<template>
  <layout-main-header-button icon="download" :count="$store.getters['download/lengthWait']">
    <div slot="title">
      下载
    </div>
    <list-download slot="content"/>
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
