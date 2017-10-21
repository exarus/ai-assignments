<template lang="pug">
.root
  .solver
    EightPuzzle(:initial-grid.sync='grid')
    .control
      ElRow(type='flex')
        ElCol(:span='12')
          ElButton(type='primary' size='large' round @click='shuffle') Shuffle
        ElCol(:span='12')
          ElButton(type='success' size='large' round @click='findSolution') Find solution
      ElRow(type='flex')
        ElCol(:span='12', :offset='12')
          ElSelect.algorithms(v-model='algorithm')
            ElOption(
              v-for='item of algorithmOptions',
              :key='item.key',
              :label='item.label',
              :value='item.key'
            )
  ElTable.solution(v-show='solution', :data='solution')
    ElTableColumn(prop='from' label='From')
    ElTableColumn(prop='to' label='To')
</template>

<script>
import deepFreeze from 'deep-freeze'
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
    maxShuffle: 16
  }],
  ['Hill', {
    label: 'Stochastic Hill climbing with sideways moves',
    method: hillClimbingSearch
  }]
])

export default {
  name: 'EightPuzzleSolver',
  components: { EightPuzzle },
  data: () => ({
    grid: null,
    algorithm: algorithmOptions.keys().next().value,
    solution: null,
    searchFailed: false
  }),
  computed: {
    chosenMethod: ({ algorithm }) => algorithmOptions.get(algorithm).method,
    maxShuffle: ({ algorithm }) => {
      const specifiedValue = algorithmOptions.get(algorithm).maxShuffle
      return specifiedValue !== undefined ? specifiedValue : 250
    }
  },
  created () {
    this.algorithmOptions = deepFreeze(Array.from(algorithmOptions,
      ([key, object]) => ({key, ...object})
    ))
  },
  methods: {
    shuffle () {
      this.grid = shuffledGrid(this.maxShuffle)
    },
    findSolution () {
      this.searchFailed = false
      try {
        if (process.env.NODE_ENV !== 'production') {
          console.time('solutionTimeTaken')
        }
        const solution = this.chosenMethod(this.grid)
        if (process.env.NODE_ENV !== 'production') {
          console.timeEnd('solutionTimeTaken')
          console.log(solution)
        }
        this.solution = solution.map(({ from, to }) => ({
          from: JSON.stringify(from.map(i => i + 1)),
          to: JSON.stringify(to.map(i => i + 1))
        }))
      } finally {
        this.searchFailed = true
      }
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
  align-items: flex-start;

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

  & > .solution {
    width: 25%;
    margin: 10px;
  }
}
</style>
