<style lang="scss">
.library-element {
  $PADDING: 10px;
  $LABEL_HEIGHT: 20px;
  @extend .transition;
  @extend .unselect;
  @extend .radius4;
  padding: $PADDING;
  .library-element--icon-group {
    @extend .transition;
    @extend .radius2;
    margin-bottom: $PADDING;
    padding: 2px;
    background-color: #FFF;
    .library-element--icon {
      @extend .radius2;
      background-color: #FFF;
      max-width: 100%;
      max-height: 100%;
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
    .library-element--icon-group {
      box-shadow:
        0 2px 4px 0 rgba($COLOR_DARK, 0.2),
        0 2px 20px 0 rgba($COLOR_DARK, 0.1);
    }
    .library-element--title {
      .library-element--title-label {
        background-color: #0058D0;
        color: #FFF;
      }
    }
  }
}
</style>

<template>
  <div class="library-element" @click="onClick">
    <square class="library-element--icon-group" flex="main:center cross:center">
      <img class="library-element--icon" :src="$url(value.cover || value.url)">
    </square>
    <div class="library-element--title" flex="main:center">
      <div class="library-element--title-label">
        {{ value.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { isArray } from 'lodash'
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
  computed: {
    isFolder () {
      return isArray(this.value.elements)
    }
  },
  methods: {
    onClick () {
      if (this.isFolder) {
        this.$store.commit('materials/viewPathPush', {
          label: this.value.name,
          value: this.index
        })
      }
    }
  }
}
</script>
