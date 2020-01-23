<template>
  <router-view/>
</template>

<script>
// const { app } = require('electron').remote
// const { DownloaderHelper } = require('node-downloader-helper')
// const dl = new DownloaderHelper('https://qiniucdn.fairyever.com/20191215221254.png', app.getPath('userData'))
// dl.on('end', () => console.log('Download Completed'))
// dl.on('progress', (stats) => console.log(stats))
// dl.start()
export default {
  async mounted () {
    // await this.$store.dispatch('local/write', {
    //   fileName: 'demo.json',
    //   fileValue: '10'
    // })
    // const fileValue = await this.$store.dispatch('local/read', {
    //   fileName: 'demo.json',
    //   defaultValue: '{ "name": "liyang" }'
    // })
    // console.log(fileValue)
    // const stop = await this.$store.dispatch('loading/start')
    // stop()
  }
}
</script>
