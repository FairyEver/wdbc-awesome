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
        @click.native="$store.commit('view/goPathIndex', index)"
        href="">
        {{ item.label }}
      </a-breadcrumb-item>
      <a-breadcrumb-item v-if="file" href="">
        {{ fileName }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'album-breadcrumb',
  computed: {
    file () {
      return this.$store.getters['view/file']
    },
    fileName () {
      if (!this.file) return ''
      if (this.file.name.length > 20) {
        return this.file.name.substring(0, 15) + '...'
      } else {
        return this.file.name
      }
    }
  }
}
</script>
