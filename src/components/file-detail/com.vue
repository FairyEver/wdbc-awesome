<style lang="scss">
.file-detail {
  @extend .unselect;
  margin-top: $LAYOUT_MAIN_PADDING;
  .preview {
    @extend .card;
    border: 4px solid #FFF;
    transition: all .3s;
    background-image: linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 0,transparent 75%,rgba(0,0,0,.25) 0),
                      linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 0,transparent 75%,rgba(0,0,0,.25) 0);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    position: relative;
    img {
      display: block;
      width: 100%;
      cursor: move;
    }
    .v-lazy-image {
      filter: grayscale(100%);
      transition: all .3s;
    }
    .v-lazy-image-loaded {
      filter: grayscale(0%);
    }
    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0 2px 10px 0 rgba(0, 0, 0, 0.1),
        0 4px 15px 0 rgba(0, 0, 0, 0.1),
        0 10px 20px 0 rgba(0, 0, 0, 0.1),
        0 10px 40px 0 rgba(0, 0, 0, 0.05);
    }
  }
  .image-title {
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
  }
  .image-info {
    line-height: 0;
    font-size: 12px;
    text-align: center;
    color: rgba(#000, .45);
    margin-bottom: $LAYOUT_MAIN_PADDING;
  }
}
</style>

<template>
  <div class="file-detail">
    <container>
      <div class="preview" flex="main:center cross:center">
        <v-lazy-image
          ref="img"
          :src="imageUrl"
          :src-placeholder="imageUrlPlaceholder"
          @load="onImageLoad"/>
      </div>
      <div class="image-title">{{ file.name }}</div>
      <div class="image-info">
        {{ file.width }} x {{ file.height }} {{ size }}
        <library-element-badge type="hdd"/>
      </div>
      <image-guide-use/>
    </container>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import url from '@/mixins/url.js'
import byte from '@/utils/byte.js'
export default {
  name: 'file-detail',
  mixins: [
    url
  ],
  computed: {
    // 图片文件对象
    file () {
      return this.$store.getters['view/file']
    },
    // 图片 url 本地路径
    imageUrlLocal () {
      return this.file.filePath ? 'file://' + this.file.filePath : ''
    },
    // 图片 url CDN
    imageUrl () {
      return this.url(this.file.url)
    },
    // 图片 url CDN 小图
    imageUrlPlaceholder () {
      return this.url(this.file.url, '', 200)
    },
    // 图片体积格式化
    size () {
      return byte(this.file.size)
    }
  },
  methods: {
    onImageLoad () {
      this.$refs.img.$el.ondragstart = event => {
        if (this.file.filePath) {
          ipcRenderer.send('ondragstart', this.file.filePath)
          event.preventDefault()
        }
      }
    }
  }
}
</script>
