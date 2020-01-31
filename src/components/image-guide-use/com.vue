<style lang="scss">
.image-guide-use {
  @extend .unselect;
  @extend .radius2;
  padding: $LAYOUT_MAIN_PADDING * 2 0;
  background-color: #FFF;
  img {
    display: block;
    width: 180px;
    height: 80px;
    margin-bottom: $LAYOUT_MAIN_PADDING / 2;
  }
  .image-guide-label {
    font-size: 12px;
  }
}
</style>

<template>
  <div class="image-guide-use" flex="dir:top main:center cross:center">
    <img src="/image/image-use-guide.png" draggable="false">
    <div class="image-guide-label">请将图片拖拽至其它应用程序窗口使用</div>
  </div>
</template>

<script>
export default {
  name: 'image-guide-use'
}
</script>
