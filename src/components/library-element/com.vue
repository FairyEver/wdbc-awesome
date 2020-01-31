<style lang="scss">
.library-element {
  $PADDING: 10px;
  $LABEL_HEIGHT: 20px;
  @extend .transition;
  @extend .unselect;
  @extend .radius4;
  padding: $PADDING;
  .library-element--box {
    position: relative;
    .library-element--box-badge-group {
      position: absolute;
      top: 2px;
      right: 2px;
    }
  }
  // 文件夹
  .library-element--folder-box {
    margin-bottom: $PADDING;
    $ICON_FOLDER_MARGIN: 2px;
    // 文件夹 行
    .library-element--folder-row {
      margin-bottom: $ICON_FOLDER_MARGIN;
      &:last-child {
        margin-bottom: 0px;
      }
      // 文件夹 列
      .library-element--folder-col {
        margin-right: $ICON_FOLDER_MARGIN;
        padding: 2px;
        background-color: rgba($COLOR_DARK, 0.03);
        &:last-child {
          margin-right: 0px;
        }
        // 文件夹 列 有效
        &.library-element--folder-col__has-image {
          background-color: #FFF;
        }
        // 文件夹 列 中的 一个文件
        .library-element--folder {
          @extend .radius1;
          background-color: #FFF;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
  // 文件
  .library-element--file-box {
    @extend .transition;
    @extend .radius2;
    margin-bottom: $PADDING;
    padding: 2px;
    background-color: #FFF;
    // 文件 一个项目
    .library-element--file {
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
  <div class="library-element" @click="onClick" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <square v-if="isDir(value)" class="library-element--box library-element--folder-box" flex="dir:top main:justify box:mean">
      <div v-for="row in 3" :key="row" class="library-element--folder-row" flex="main:justify box:mean">
        <div
          v-for="col in 3"
          :key="col"
          class="library-element--folder-col"
          :class="{ 'library-element--folder-col__has-image': value.elements.length >= (3 * (row - 1) + col) }"
          flex="main:center cross:center">
          <v-lazy-image
            v-if="value.elements.length >= (3 * (row - 1) + col)"
            class="library-element--folder"
            :src="url(value.elements[3 * (row - 1) + col - 1].url, '/icon/folder.png', 100)"
            src-placeholder="/icon/file-placeholder.png"/>
        </div>
      </div>
      <div class="library-element--box-badge-group">
        <library-element-badge v-if="isHdd(value)" type="hdd"/>
      </div>
    </square>
    <square v-else class="library-element--box library-element--file-box" flex="main:center cross:center">
      <v-lazy-image
        ref="img"
        class="library-element--file"
        :src="url(value.url, '', 200)"
        src-placeholder="/icon/file-placeholder.png"
        @load="onImageLoad"/>
      <div class="library-element--box-badge-group">
        <library-element-badge v-if="isHdd(value)" type="hdd"/>
      </div>
    </square>
    <div class="library-element--title" flex="main:center">
      <div class="library-element--title-label">
        {{ value.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
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
  methods: {
    /**
     * @description 判断是否为文件夹
     * @param {Object} item 需要检测的项目
     */
    isDir (item) {
      return item.elements && isArray(item.elements)
    },
    /**
     * @description 判断是否在本地 如果是文件夹 检查文件夹内是否全部在本地
     * @param {Object} item 需要检测的项目
     */
    isHdd (item) {
      if (this.isDir(item)) {
        return item.elements.reduce((result, element) => {
          if (result === false) return false
          if (!this.isHdd(element)) return false
          return true
        }, true)
      }
      return item.filePath
    },
    /**
     * @description 用户点击时触发
     */
    onClick () {
      if (this.isDir(this.value)) {
        this.$store.commit('view/push', {
          label: this.value.name,
          value: this.index
        })
      } else {
        this.$store.commit('view/setFileId', this.value.id)
      }
    },
    onMouseenter () {
      // console.log('onMouseenter')
    },
    onMouseleave () {
      // console.log('onMouseleave')
    },
    onImageLoad () {
      this.$refs.img.$el.ondragstart = event => {
        if (this.value.filePath) {
          ipcRenderer.send('ondragstart', this.value.filePath)
          event.preventDefault()
        }
      }
    }
  }
}
</script>
