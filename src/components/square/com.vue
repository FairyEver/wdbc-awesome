<template>
  <div :style="{ height: width + 'px' }">
    <slot/>
  </div>
</template>

<script>
import { throttle } from 'lodash'
export default {
  name: 'square',
  data () {
    return {
      width: '',
      throttledUpdateSize: function () {}
    }
  },
  mounted () {
    this.throttledUpdateSize = throttle(this.updateSize, 300)
    window.addEventListener('resize', this.throttledUpdateSize)
    this.throttledUpdateSize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.throttledUpdateSize)
  },
  methods: {
    updateSize () {
      this.width = this.$el.offsetWidth
    }
  }
}
</script>
