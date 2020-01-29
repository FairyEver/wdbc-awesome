<style lang="scss">
.album-breadcrumb {
  @extend .unselect;
  height: $LAYOUT_HEADER_HEIGHT;
  padding: 0 $LAYOUT_MAIN_PADDING;
  background-color: rgba($COLOR_BACKGROUND, .9);
}
</style>

<template>
  <div class="album-breadcrumb" flex="cross:center">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-icon type="home"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item @click.native="$store.commit('view/clean')" href="">
        {{ $store.state.view.base.label }}
      </a-breadcrumb-item>
      <a-breadcrumb-item
        v-for="(item, index) of $store.state.view.path"
        :key="item.id"
        @click.native="$store.commit('view/pathSet', index)"
        href="">
        {{ item.label }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'album-breadcrumb'
}
</script>
