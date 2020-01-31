<style lang="scss">
.download-overview-bar {
  @extend .radius2;
  padding: $LAYOUT_MAIN_PADDING / 4 $LAYOUT_MAIN_PADDING / 2;
  .download-overview-bar--title {
    text-align: center;
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
  <transition name="fade-progress">
    <div v-if="show" class="download-overview-bar">
      <div class="download-overview-bar--title">
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
  name: 'download-overview-bar',
  data () {
    return {
      show: false,
      showTimer: null
    }
  },
  computed: {
    active () {
      const countAll = this.$store.getters['download/countAll']
      const countFinished = this.$store.getters['download/countFinished']
      return countAll !== countFinished
    },
    title () {
      const speed = this.$store.getters['download/speed']
      const countAll = this.$store.getters['download/countAll']
      const countFinished = this.$store.getters['download/countFinished']
      const done = countFinished === countAll
      return done ? '完成' : `正在同步 ${countFinished}/${countAll} ${speed}`
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
