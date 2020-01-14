<template>
  <a-popover placement="bottomRight" :trigger="trigger">
    <slot v-if="this.$slots.content" slot="content" name="content"/>
    <slot v-if="this.$slots.title" slot="title" name="title"/>
    <div class="layout-header-button" flex="main:center cross:center">
      <a-badge :count="count" :offset="[3, -3]">
        <a-icon :type="icon" :spin="spin"/>
      </a-badge>
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
    },
    count: {
      type: Number,
      default: 0,
      required: false
    }
  }
}
</script>
