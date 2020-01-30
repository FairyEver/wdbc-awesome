<style lang="scss">
.file-detail {
  width: 460px;
  margin: auto;
  margin-top: $LAYOUT_MAIN_PADDING;
  .image-box {
    @extend .unselect;
    @extend .radius2;
    border: 4px solid #FFF;
    overflow: hidden;
    transition: all .3s;
    box-shadow:
      0 2px 10px 0 rgba(0, 0, 0, 0.05),
      0 4px 15px 0 rgba(0, 0, 0, 0.05);
    background-image: linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 0,transparent 75%,rgba(0,0,0,.25) 0),
                      linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 0,transparent 75%,rgba(0,0,0,.25) 0);
    background-color: #eee;
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    img {
      display: block;
      width: 100%;
    }
    .v-lazy-image {
      filter: grayscale(100%);
      transition: all .2s;
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
    font-size: 12px;
    text-align: center;
    color: rgba(#000, .45);
  }
}
</style>

<template>
  <div class="file-detail">
    <div class="image-box" :style="imageBoxStyle">
      <v-lazy-image ref="img" :src="imageUrl" :src-placeholder="imageUrlPlaceholder"/>
    </div>
    <div class="image-title">{{ file.name }}</div>
    <div class="image-info">{{ file.width }} x {{ file.height }} {{ size }}</div>
  </div>
</template>

<script>
import url from '@/mixins/url.js'
import byte from '@/utils/byte.js'
export default {
  name: 'file-detail',
  mixins: [
    url
  ],
  data () {
    return {
      width: 460
    }
  },
  computed: {
    imageBoxStyle () {
      return {
        height: this.width / this.file.width * this.file.height + 'px',
        width: this.width + 'px'
      }
    },
    file () {
      return this.$store.getters['view/file']
    },
    filePath () {
      return this.file.filePath ? 'file://' + this.file.filePath : ''
    },
    imageUrl () {
      return this.url(this.file.url)
    },
    imageUrlPlaceholder () {
      return this.url(this.file.url, '', 200)
    },
    size () {
      return byte(this.file.size)
    }
  }
}
</script>
