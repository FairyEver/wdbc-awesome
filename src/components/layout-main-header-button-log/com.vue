<template>
  <layout-main-header-button icon="bell" :count="$store.getters['log/length']" dot>
    <div slot="title">消息</div>
    <list-log slot="content"/>
    <div slot="footer" flex="main:right">
      <a-button icon="delete" type="danger" @click="$store.commit('log/clean')">
        清空
      </a-button>
    </div>
  </layout-main-header-button>
</template>

<script>
export default {
  name: 'layout-main-header-button-log'
}
</script>
