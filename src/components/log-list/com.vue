<template>
  <div>
    <div v-for="item of $store.getters['log/list']" :key="item.id">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'log-list'
}
</script>
