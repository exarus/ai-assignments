<template lang="pug">
#app
  router-view
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

#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
