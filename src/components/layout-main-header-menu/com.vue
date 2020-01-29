<template>
  <a-menu mode="horizontal" theme="dark" :selected-keys="selectedKeys">
    <a-menu-item key="album">
      <a-icon type="appstore"/>画廊
    </a-menu-item>
    <a-menu-item key="setting">
      <a-icon type="setting"/>设置
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'layout-main-header-menu',
  computed: {
    selectedKeys () {
      return [
        this.$route.name
      ]
    }
  }
}
</script>
