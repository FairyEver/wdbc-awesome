<style lang="scss">
.page-album {
  @extend .full;
  .page-album--layer-main {
    @extend .full;
    padding: $LAYOUT_MAIN_PADDING;
    padding-top: $LAYOUT_HEADER_HEIGHT;
  }
  .page-album--layer-breadcrumb {
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
      <a-row style="margin: 0 -10px;">
        <a-col v-for="(el, index) of $store.getters['view/list']" :key="el.id" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
          <library-element :value="el" :index="index"/>
        </a-col>
      </a-row>
    </div>
    <div class="page-album--layer-breadcrumb">
      <album-breadcrumb/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-album'
}
</script>
