<style lang="scss">
.layout-default-header-button {
  @extend .unselect;
  @extend .unselect;
  .ant-badge {
    .ant-badge-count {
      $badge-height: 14px;
      $text-width: 8px;
      min-width: $badge-height;
      height: $badge-height;
      padding: 0 ($badge-height - $text-width) / 2;
      font-size: 12px;
      line-height: $badge-height;
      border-radius: $badge-height / 2;
    }
  }
}
</style>

<template>
  <a-popover class="layout-default-header-button" placement="bottomRight" :trigger="trigger">
    <div v-if="this.$slots.content" slot="content" class="unselect">
      <slot name="content"/>
    </div>
    <div v-if="this.$slots.title" slot="title" class="unselect">
      <slot name="title"/>
    </div>
    <div class="layout-header-button" flex="main:center cross:center">
      <a-badge :count="count" :offset="[1, -1]">
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
