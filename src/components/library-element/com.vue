<style lang="scss">
.library-element {
  @extend .transition;
  @extend .unselect;
  @extend .radius2;
  padding: 10px 10px 0 10px;
  .library-element--cover {
    @extend .transition;
    @extend .radius2;
    background-color: #FFF;
    padding: 2px;
    .library-element--cover-image {
      @extend .square;
      @extend .bg-cover;
      @extend .radius2;
    }
  }
  .library-element--title {
    font-size: 12px;
    padding: 10px 0;
    .library-element--title-label {
      @extend .transition;
      @extend .radius10;
      height: 20px;
      line-height: 20px;
      padding: 0 8px;
    }
  }
  &:hover {
    background-color: rgba($COLOR_DARK, 0.05);
    .library-element--cover {
      transform: translateY(-1px);
      box-shadow:
        0 2px 4px 0 rgba($COLOR_DARK, 0.1),
        0 2px 20px 0 rgba($COLOR_DARK, 0.2);
    }
    .library-element--title {
      .library-element--title-label {
        background-color: rgba($COLOR_DARK, .1);
      }
    }
  }
}
</style>

<template>
  <div class="library-element" @click="onClick">
    <div class="library-element--cover">
      <div
        class="library-element--cover-image"
        :style="{ backgroundImage: `url(${$url(value.cover || value.url)})` }"></div>
    </div>
    <div class="library-element--title" flex="main:center">
      <div class="library-element--title-label">
        {{ value.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'library-element',
  props: {
    index: {
      type: Number,
      default: 0,
      required: false
    },
    value: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  methods: {
    onClick () {
      if (this.value.elements) {
        this.$store.commit('materials/viewPathPush', {
          label: this.value.name,
          value: this.index
        })
      }
    }
  }
}
</script>
