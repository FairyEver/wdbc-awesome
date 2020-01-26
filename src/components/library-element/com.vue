<style lang="scss">
.library-element {
  $PADDING: 10px;
  $LABEL_HEIGHT: 20px;
  @extend .transition;
  @extend .unselect;
  @extend .radius4;
  padding: $PADDING;
  // 文件夹
  .library-element--folder-group {
    margin-bottom: $PADDING;
    $ICON_FOLDER_MARGIN: 2px;
    // 文件夹 行
    .library-element--icon-folder-row {
      margin-bottom: $ICON_FOLDER_MARGIN;
      &:last-child {
        margin-bottom: 0px;
      }
      // 文件夹 列
      .library-element--icon-folder-col {
        margin-right: $ICON_FOLDER_MARGIN;
        padding: 2px;
        background-color: rgba($COLOR_DARK, 0.03);
        &:last-child {
          margin-right: 0px;
        }
        // 文件夹 列 有效
        &.library-element--icon-folder-col__has-image {
          background-color: #FFF;
        }
        // 文件夹 列 中的 一个文件
        .library-element--icon-folder {
          @extend .radius1;
          background-color: #FFF;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
  // 文件
  .library-element--icon-group {
    @extend .transition;
    @extend .radius2;
    margin-bottom: $PADDING;
    padding: 2px;
    background-color: #FFF;
    // 文件 一个项目
    .library-element--icon-file {
      @extend .radius2;
      background-color: #FFF;
      max-width: 100%;
      max-height: 100%;
    }
  }
  // 文件或者文件夹名称
  .library-element--title {
    font-size: 12px;
    .library-element--title-label {
      @extend .transition;
      @extend .nowrap;
      height: $LABEL_HEIGHT;
      line-height: $LABEL_HEIGHT;
      border-radius: $LABEL_HEIGHT / 2;
      padding: 0 $PADDING;
    }
  }
  // 鼠标移过的样式
  &:hover {
    background-color: rgba($COLOR_DARK, 0.05);
    .library-element--title {
      .library-element--title-label {
        background-color: $COLOR_TEXT_LABEL_ACTIVE;
        color: #FFF;
      }
    }
  }
}
</style>

<template>
  <div class="library-element" @click="onClick">
    <square v-if="isDir" class="library-element--folder-group" flex="dir:top main:justify box:mean">
      <div v-for="row in 3" :key="row" class="library-element--icon-folder-row" flex="main:justify box:mean">
        <div
          v-for="col in 3"
          :key="col"
          class="library-element--icon-folder-col"
          :class="{ 'library-element--icon-folder-col__has-image': value.elements.length >= (3 * (row - 1) + col) }"
          flex="main:center cross:center">
          <img
            v-if="value.elements.length >= (3 * (row - 1) + col)"
            class="library-element--icon-folder"
            :src="url(value.elements[3 * (row - 1) + col - 1].url, '/icon/folder.png')">
        </div>
      </div>
    </square>
    <square v-else class="library-element--icon-group" flex="main:center cross:center">
      <img class="library-element--icon-file" :src="url(value.cover || value.url)">
    </square>
    <div class="library-element--title" flex="main:center">
      <div class="library-element--title-label">
        {{ value.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { isArray } from 'lodash'
import url from '@/mixins/url.js'
export default {
  name: 'library-element',
  mixins: [
    url
  ],
  props: {
    index: {
      type: Number,
      default: 0,
      required: false
    },
    value: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  computed: {
    isDir () {
      return isArray(this.value.elements)
    }
  },
  methods: {
    /**
     * @description 用户点击时触发
     */
    onClick () {
      if (this.isDir) {
        this.$store.commit('view/push', {
          label: this.value.name,
          value: this.index
        })
      }
    }
  }
}
</script>
