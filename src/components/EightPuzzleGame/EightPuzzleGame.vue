<script>
import Game from './Game'
import EightPuzzle from '../EightPuzzle'
import GameStartDialog from './GameStartDialog'
import GameWinDialog from './GameWinDialog'

const viewStateStorageKey = 'gameViewState'

export default {
  name: 'EightPuzzleGame',

  components: {
    EightPuzzle,
    GameStartDialog,
    GameWinDialog
  },

  data: () => ({
    game: null,
    state: 'init'
  }),

  watch: {
    state (state) {
      localStorage.setItem(viewStateStorageKey, state)
      if (state === 'inProgress') {
        this.game = Game.load()
      }
    },

    game: {
      handler (game) {
        if (game.isPuzzleSolved()) {
          this.finishGame()
        }
      },

      deep: true
    }
  },

  created () {
    const storedState = localStorage.getItem(viewStateStorageKey)
    if (storedState !== null) {
      this.state = storedState
    }
  },

  methods: {
    prepareNewGame () {
      this.state = 'startDialog'
    },

    startNewGame (game) {
      this.state = 'inProgress'
      this.game = game
    },

    finishGame () {
      this.state = 'winDialog'
    }
  }
}
</script>

<template lang="pug">
.root
  .game
    EightPuzzle(:grid.sync='grid')
    .control
      ElButton(
        v-if="state === 'inProgress'",
        @click='prepareNewGame',
        type='warning',
        size='large'
      ) Restart
      ElButton(
        v-if="state === 'init'",
        @click='prepareNewGame',
        type='primary',
        size='large'
      ) Start Game
  GameStartDialog(
    :visible="state === 'startDialog'",
    @gameStarted="game => startNewGame(game)"
  )
  GameWinDialog(
    :visible="state === 'winDialog'",
    @gameStarted="game => startNewGame(game)"
  )
</template>

<style scoped lang="postcss">
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
