<style lang="scss">
.page-sync {
  @extend .full;
  padding: $LAYOUT_MAIN_PADDING;
}
</style>

<template>
  <div class="page-sync">
    <container>
      <overview-hdd/>
    </container>
  </div>
</template>

<script>
export default {
  name: 'page-sync'
}
</script>
