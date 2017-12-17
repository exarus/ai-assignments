<template lang="pug">
#app
  router-view
</template>

<script>
import 'mobile-drag-drop/default.css'
import { polyfill as dragAndDropPolyfill } from 'mobile-drag-drop'
import { scrollBehaviourDragImageTranslateOverride as dragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour'

dragAndDropPolyfill({ dragImageTranslateOverride })

export default {
  name: 'app'
}
</script>

<style lang="postcss">
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
