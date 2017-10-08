<template lang="pug">
.root
  .solver
    eight-puzzle(:initial-grid='grid')
    .control
      el-button(@click.prevent='shuffle' type='primary' size='large') Shuffle
      el-button(@click.prevent='findSolution' type='success' size='large' ) Find solution
</template>

<script>
import EightPuzzle from '@/components/EightPuzzle'
import { shuffledGrid } from '@/util/8-puzzle'
import findSolution from '@/ai/8-puzzle/aStarSearch'

export default {
  name: 'EightPuzzleSolver',
  components: { EightPuzzle },
  data () {
    return {
      grid: null
    }
  },
  methods: {
    shuffle () {
      this.grid = shuffledGrid(33)
    },
    findSolution () {
      const solution = findSolution(this.grid)
      console.log(solution)
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

  & > .solver {
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
