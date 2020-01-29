<style lang="scss">
.progress-download-overview {
  width: 160px;
  margin: 0 $LAYOUT_MAIN_PADDING / 2;
  .progress-download-overview--title {
    text-align: center;
    color: rgba(#FFF, 0.65);
    font-size: 10px;
    line-height: 10px;
    margin-bottom: $LAYOUT_MAIN_PADDING / 4;
  }
  .ant-progress-small {
    line-height: 6px;
    display: block;
  }
  .ant-progress-outer {
    line-height: 6px;
  }
}
</style>

<template>
  <transition name="fade">
    <div v-if="show" class="progress-download-overview">
      <div class="progress-download-overview--title">
        {{ title }}
      </div>
      <a-progress
        :percent="$store.getters['download/progress']"
        size="small"
        :show-info="false"/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'progress-download-overview',
  data () {
    return {
      show: false,
      showTimer: null
    }
  },
  computed: {
    active () {
      return this.$store.getters['download/playing']
    },
    title () {
      const speed = this.$store.getters['download/speed']
      const length = this.$store.getters['download/length']
      const lengthDone = this.$store.getters['download/lengthDone']
      const done = lengthDone === length
      return done ? '完成' : `正在同步 ${lengthDone}/${length} ${speed}`
    }
  },
  watch: {
    active: {
      handler (value) {
        if (this.showTimer) {
          clearTimeout(this.showTimer)
        }
        if (value) {
          this.show = true
        } else {
          this.showTimer = setTimeout(() => {
            this.show = false
          }, 1000)
        }
      },
      immediate: true
    }
  }
}
</script>
