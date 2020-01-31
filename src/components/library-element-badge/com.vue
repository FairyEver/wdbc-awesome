<style lang="scss">
.library-element-badge {
  $height: 16px;
  height: $height;
  border-radius: 2px;
  padding: 0 $height / 4;
  color: #FFF;
  font-size: 10px;
  i {
    margin-right: 2px;
  }
  span {
    font-size: 10px;
    line-height: 10px;
  }
}
</style>

<template>
  <div class="library-element-badge" :style="style" flex="main:center cross:center">
    <a-icon :type="icon"/>
    <span>{{ label }}</span>
  </div>
</template>

<script>
const setting = {
  hdd: {
    color: '#57C22D',
    icon: 'hdd',
    label: 'HDD'
  }
}
export default {
  name: 'library-element-badge',
  props: {
    type: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    style () {
      return {
        backgroundColor: setting[this.type].color
      }
    },
    icon () {
      return setting[this.type].icon
    },
    label () {
      return setting[this.type].label
    }
  }
}
</script>
