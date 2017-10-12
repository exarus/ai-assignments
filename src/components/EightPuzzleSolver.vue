<template lang="pug">
.root
  .solver
    EightPuzzle(:initial-grid.sync='grid')
    .control
      ElRow(type='flex')
        ElCol(:span='12')
          ElButton(@click='shuffle' type='primary' size='large') Shuffle
        ElCol(:span='12')
          ElButton(@click='findSolution' type='success' size='large' ) Find solution
      ElRow(type='flex')
        ElCol(:span='12', :offset='12')
          ElSelect.algorithms(v-model='algorithm')
            ElOption(
              v-for='item of algorithmOptions',
              :key='item.key',
              :label='item.label',
              :value='item.key'
            )
</template>

<script>
import EightPuzzle from '@/components/EightPuzzle'
import { shuffledGrid } from '@/util/8-puzzle'
import depthLimitedSearch from '@/ai/8-puzzle/depthLimitedSearch'
import aStarSearch from '@/ai/8-puzzle/aStarSearch'
import hillClimbingSearch from '@/ai/8-puzzle/hillClimbingSearch'

// Map preserves iteration order
const algorithmOptions = new Map([
  ['A*', {
    label: 'A* search',
    method: aStarSearch
  }],
  ['DLS', {
    label: 'Depth Limited Search',
    method: depthLimitedSearch,
    maxShuffle: 11
  }],
  ['Hill', {
    label: 'Hill climbing with side moves and random relaunch',
    method: hillClimbingSearch
  }]
])

export default {
  name: 'EightPuzzleSolver',
  components: { EightPuzzle },
  data () {
    // Vue templates doesn't support ES6 Map
    this.algorithmOptions = Array.from(algorithmOptions,
      ([key, object]) => ({key, ...object})
    )
    return {
      grid: null,
      algorithm: algorithmOptions.keys().next().value
    }
  },
  computed: {
    chosenMethod () {
      return algorithmOptions.get(this.algorithm).method
    },
    maxShuffle () {
      const specifiedValue = algorithmOptions.get(this.algorithm).maxShuffle
      return specifiedValue !== undefined ? specifiedValue : 250
    }
  },
  methods: {
    shuffle () {
      this.grid = shuffledGrid(this.maxShuffle)
    },
    findSolution () {
      const findSolution = this.chosenMethod
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
      margin: 0.5vmin;

      & button {
        font-size: 1.33em;
        width: calc(100% - 1vmin);
        margin: 0.5vmin 1vmin;
      }

      & .algorithms {
        font-size: 1.33em;
        margin: 0.5vmin 1vmin;
        width: calc(100% - 1vmin);
      }
    }
  }
}
</style>
