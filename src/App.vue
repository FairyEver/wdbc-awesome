<template>
  <div id="app">
    <img ref="img" src="https://www.baidu.com/img/bd_logo1.png?where=super" alt="" srcset="">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  mounted () {
    this.$refs.img.ondragstart = (event) => {
      event.preventDefault()
      ipcRenderer.send('ondragstart', '/path/to/item')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
