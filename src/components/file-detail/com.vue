<style lang="scss">
.file-detail {
  @extend .unselect;
  max-width: 400px;
  margin: 0 auto;
  .preview {
    width: 100%;
  }
  .v-lazy-image {
    filter: blur(2px) grayscale(100%);
    transition: filter .3s;
  }
  .v-lazy-image-loaded {
    filter: blur(0);
  }
}
</style>

<template>
  <div class="file-detail">
    <v-lazy-image
      class="preview"
      ref="img"
      :src="imageUrl"
      :src-placeholder="imageUrlPlaceholder"/>
    <div>{{ file.name }}</div>
    <div>{{ file.width }} x {{ file.height }}</div>
    <div>{{ size }}</div>
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
  computed: {
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
