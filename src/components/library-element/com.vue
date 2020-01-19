<style lang="scss">
.library-element {
  $PADDING: 10px;
  $TRANSITION_Y: 1px;
  $LABEL_HEIGHT: 20px;
  @extend .transition;
  @extend .unselect;
  @extend .radius4;
  padding: $PADDING;
  .library-element--cover {
    @extend .transition;
    @extend .radius2;
    background-color: #FFF;
    padding: 2px;
    margin-bottom: $PADDING - $TRANSITION_Y;
    .library-element--cover-image {
      @extend .square;
      @extend .bg-cover;
      @extend .radius2;
    }
  }
  .library-element--title {
    font-size: 12px;
    .library-element--title-label {
      @extend .transition;
      @extend .nowrap;
      height: $LABEL_HEIGHT;
      line-height: $LABEL_HEIGHT;
      border-radius: $LABEL_HEIGHT / 2;
      padding: 0 $PADDING;
    }
  }
  &:hover {
    background-color: rgba($COLOR_DARK, 0.05);
    .library-element--cover {
      transform: translateY(-$TRANSITION_Y);
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
