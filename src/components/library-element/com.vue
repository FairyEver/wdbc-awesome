<style lang="scss">
.library-element {
  @extend .unselect;
  @extend .radius4;
  position: relative;
  transition: all .1s;
  border-radius: 4px;
  overflow: hidden;
  padding: 2px;
  background-color: #FFF;
  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 2px 4px 0 rgba(#000, 0.1),
      0 2px 20px 0 rgba(#000, 0.20);
  }
  .library-element--cover {
    @extend .square;
    @extend .bg-cover;
    @extend .radius2;
  }
}
</style>

<template>
  <div class="library-element">
    <img
      class="library-element--cover"
      :style="{ backgroundImage: `url(${$url(value.cover)})` }"/>
  </div>
</template>

<script>
export default {
  name: 'library-element',
  props: {
    value: {
      type: Object,
      default: () => ({}),
      required: false
    }
  }
}
</script>
