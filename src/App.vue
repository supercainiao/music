<template>
  <div id="app">
    <m-headr></m-headr>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
 import MHeadr from './components/m-header/m-header'
 import Tab from './components/tab/tab'
  export default {
    components: {
      MHeadr,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/base";
    @import "./common/stylus/variable";
    #app
      color: $color-text
</style>
