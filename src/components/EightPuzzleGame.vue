<template lang="pug">
.root
  .game
    eight-puzzle(
      :initial-grid='grid',
      @ordered='winNotification'
    )
    .control
      el-button(v-if='gameInProgress', @click='startNewGame' type='warning' size='large') Restart
      el-button(v-else @click='startNewGame' type='primary' size='large') Start Game
  el-dialog.win-dialog(
    title='You won!'
    center
    :visible.sync='winNotificationVisible'
  )
    span Do you want to start a new game?
    span(slot='footer')
      el-button(@click='finishGame') Cancel
      el-button(type='primary', @click='startNewGame') Confirm
</template>

<script>
import EightPuzzle from '@/components/EightPuzzle'
import { shuffledGrid } from '@/util/8-puzzle'

const gameInProgressStorageKey = 'gameInProgress'

export default {
  name: 'EightPuzzleGame',
  components: { EightPuzzle },
  data () {
    const storedInProgress = localStorage.getItem(gameInProgressStorageKey)
    return {
      grid: null,
      gameInProgress: storedInProgress !== null ? storedInProgress : false,
      winNotificationVisible: false
    }
  },
  watch: {
    gameInProgress (gameInProgress) {
      localStorage.setItem(gameInProgressStorageKey, JSON.stringify(gameInProgress))
    }
  },
  methods: {
    startNewGame () {
      this.winNotificationVisible = false
      this.gameInProgress = true
      this.grid = shuffledGrid(200)
    },
    winNotification () {
      if (this.gameInProgress) {
        this.winNotificationVisible = true
        this.gameInProgress = false
      }
    },
    finishGame () {
      this.winNotificationVisible = false
      this.gameInProgress = false
    }
  }
}
</script>

<style scoped>
.root {
  color: #5e6d82;
  font-size: 3.6vmin;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .game {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;

    & > .control {
      width: 74.2vmin;
      margin: 1vmin;
      display: inline-flex;
      justify-content: space-evenly;
      align-items: center;

      & > button {
        flex: 50%;
        max-width: 37vmin;
        font-size: 1.33em;
      }
    }
  }

  & .win-dialog {
    text-align: center;
  }
}
</style>
