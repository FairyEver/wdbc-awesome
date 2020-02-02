<style lang="scss">
.container {
  max-width: 360px;
  min-width: 300px;
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
