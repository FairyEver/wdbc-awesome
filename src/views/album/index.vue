<style lang="scss">
.page-album {}
</style>

<template>
  <div class="page-album">
    <!-- <img ref="img" alt="Vue logo" src="@/assets/logo.png"> -->
    <a-row :gutter="10">
      <a-col
        v-for="n in 8"
        :key="n"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
        class="is-mb-10">
        <a-card hoverable>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="edit" />
            <a-icon type="ellipsis" />
          </template>
          <a-card-meta title="Card title" description="This is the description">
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
export default {
  name: 'page-album',
  async mounted () {
    // this.$refs.img.ondragstart = (event) => {
    //   event.preventDefault()
    //   ipcRenderer.send('ondragstart', '/path/to/item')
    // }
    const result = await this.$api.LIBRARY_LOAD()
    console.log(result)
    console.log(this.$store.getters['library/getterDemo'])
  },
  methods: {
  }
}
</script>
