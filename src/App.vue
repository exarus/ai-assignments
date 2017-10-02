<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { polyfill as dragAndDropPolyfill } from 'mobile-drag-drop'

dragAndDropPolyfill()

export default {
  name: 'app'
}
</script>

<style>
@import '~mobile-drag-drop/default.css';
@import '~element-ui/lib/theme-default/index.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
