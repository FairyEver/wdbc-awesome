<style lang="scss">
.library-element {
  position: relative;
  .library-element--cover {
    width: 100%;
    padding-top: 100%;
    height: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>

<template>
  <div class="library-element">
    <img class="library-element--cover" :style="{ backgroundImage: `url(${$url(value.cover)})` }"/>
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
