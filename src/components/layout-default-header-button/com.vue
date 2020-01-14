<template>
  <a-popover placement="bottomRight" :trigger="trigger">
    <template v-if="this.$slots.content" slot="content">
      <slot name="content"/>
    </template>
    <template v-if="this.$slots.title" slot="title">
      <slot name="title"/>
    </template>
    <div class="layout-header-button" flex="main:center cross:center">
      <a-icon :type="icon" :spin="spin"/>
    </div>
  </a-popover>
</template>

<script>
export default {
  name: 'layout-default-header-button',
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    spin: {
      type: Boolean,
      default: false,
      required: false
    },
    trigger: {
      type: String,
      default: 'click', // focus | hover | click
      required: false
    }
  }
}
</script>
