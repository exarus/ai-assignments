<script>
import GameStartDialog from './GameStartDialog'

export default {
  name: 'GameWinDialog',
  components: { GameStartDialog }
}
</script>

<template functional lang="pug">
ElDialog(
    title='You won!',
    visible
    center
  )
  .restart-question Do you want to start a new game?
  span(slot='footer')
    ElButton(@click='listeners.gameFinished') Cancel
    ElButton(
      type='primary',
      @click='listeners.prepareNewGame'
    ) Confirm
</template>

<style scoped lang="postcss">
.restart-question {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
