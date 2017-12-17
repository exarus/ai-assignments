<script>
import GameStartDialog from './GameStartDialog'

export default {
  name: 'GameWinDialog',
  components: { GameStartDialog },
  props: ['visible'],
  methods: {
    dialogWidth () {
      return window.innerWidth > 1130 ? '30%' : '339px'
    }
  }
}
</script>

<template lang="pug">
ElDialog(title='You won!', :width='dialogWidth()' center)
  .restart-question Do you want to start a new game?
  span(slot='footer')
    ElButton(@click='finishGame') Cancel
    ElButton(type='primary', @click='startNewGame') Confirm
</template>

<style scoped lang="postcss">
.restart-question {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
