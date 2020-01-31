<style lang="scss">
.progress-bar {
  @extend .radius2;
  $height: 4px;
  $colorBackground: rgba(#000, .1);
  $colorProgress: #2593FC;
  $colorDone: #57C22D;
  position: relative;
  height: $height;
  background-color: $colorBackground;
  margin: 10px 0;
  .progress-bar--layer-bar {
    @extend .radius2;
    position: absolute;
    top: 0px;
    left: 0px;
    height: $height;
    transition: all .3s;
    &.is-progress {
      background-color: $colorProgress;
    }
    &.is-done {
      background-color: $colorDone;
    }
  }
}
</style>

<template>
  <div class="progress-bar">
    <div class="progress-bar--layer-bar is-progress" :style="barStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    complete: {
      type: String,
      default: '',
      required: true
    },
    total: {
      type: String,
      default: '',
      required: true
    },
    percent: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    barStyle () {
      return {
        width: this.percent + '%'
      }
    }
  }
}
</script>
