<style lang="scss">
.page-album {
  @extend .full;
  .page-album--layer-main {
    @extend .full;
    padding: $LAYOUT_MAIN_PADDING;
    padding-top: 46px;
  }
  .page-album--layer-header {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
}
</style>

<template>
  <div class="page-album">
    <div class="page-album--layer-main">
      <file-detail v-if="$store.getters['view/file']"/>
      <file-list v-else/>
    </div>
    <div class="page-album--layer-header">
      <album-breadcrumb/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-album'
}
</script>
