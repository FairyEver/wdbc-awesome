<style lang="scss">
.container {
  width: 360px;
  margin: 0 auto;
}
</style>

<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'container'
}
</script>
