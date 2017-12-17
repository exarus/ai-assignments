<script>
import equals from 'ramda/src/equals'
import EightPuzzle from './EightPuzzle'
import GameStartDialog from './GameStartDialog'
import { defaultGrid } from '@/util/8-puzzle'
import EightPuzzleGame from '@/gamedev/EightPuzzleGame'

const gameInProgressStorageKey = 'gameInProgress'

export default {
  name: 'EightPuzzleGame',
  components: { EightPuzzle, GameStartDialog },
  data () {
    const storedInProgress = localStorage.getItem(gameInProgressStorageKey)
    return {
      grid: null,
      gameInProgress: storedInProgress !== null ? JSON.parse(storedInProgress) : false,
      startDialogVisible: false,
      winDialogVisible: false
    }
  },
  watch: {
    grid (newGrid) {
      if (this.gameInProgress && equals(newGrid, defaultGrid)) {
        this.gameInProgress = false
        this.winNotificationVisible = true
      }
    },
    gameInProgress (gameInProgress) {
      localStorage.setItem(gameInProgressStorageKey, JSON.stringify(gameInProgress))
    }
  },
  methods: {
    prepareNewGame () {
      this.startDialogVisible = true
      this.gameInProgress = false
      this.winDialogVisible = false
    },
    startNewGame () {
      this.grid = new EightPuzzleGame()
    },
    finishGame () {
      this.startDialogVisible = true
      this.gameInProgress = false
      this.winDialogVisible = false
    },
    dialogWidth () {
      return window.innerWidth > 1130 ? '30%' : '339px'
    }
  }
}
</script>

<template lang="pug">
  .root
    .game
      EightPuzzle(:initial-grid.sync='grid')
      .control
        ElButton(v-if='gameInProgress', @click='startNewGame' type='warning' size='large') Restart
        ElButton(v-else @click='startNewGame' type='primary' size='large') Start Game
    GameStartDialog(:visible.sync='startDialogVisible')
    GameWinDialog(:visible.sync='winDialogVisible')
</template>

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
}
</style>
