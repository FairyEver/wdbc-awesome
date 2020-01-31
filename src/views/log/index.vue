<style lang="scss">
.page-log {
  @extend .full;
  padding: $LAYOUT_MAIN_PADDING;
}
</style>

<template>
  <div class="page-log">
    <container>
      <list-log/>
    </container>
  </div>
</template>

<script>
export default {
  name: 'page-log'
}
</script>
