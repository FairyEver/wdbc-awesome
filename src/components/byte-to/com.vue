<template>
  <span class="byte-to">
    byte-to
  </span>
</template>

<script>
import byteTo from '@/utils/byte.js'
export default {
  name: 'byte-to',
  props: {
    value: {
      type: Number,
      default: 0,
      required: false
    }
  },
  computed: {
    text () {
      return byteTo(this.value)
    }
  }
}
</script>
