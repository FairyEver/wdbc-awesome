<style lang="scss">
.progress-download-overview {
  width: 300px;
  .progress-download-overview--title {
    text-align: center;
    color: rgba(#FFF, 0.65);
    font-size: 10px;
    line-height: 10px;
    margin-bottom: -2px;
  }
}
</style>

<template>
  <div class="progress-download-overview">
    <div class="progress-download-overview--title">
      正在下载资料库 {{ $store.getters['download/lengthDone'] }} / {{ $store.getters['download/length'] }} - {{ $store.getters['download/speed'] }}
    </div>
    <a-progress :percent="$store.getters['download/progress']" size="small" :show-info="false"/>
  </div>
</template>

<script>
export default {
  name: 'progress-download-overview'
}
</script>
