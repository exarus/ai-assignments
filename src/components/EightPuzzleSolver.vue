<script>
import map from 'ramda/src/map'
import deepFreeze from 'deep-freeze'
import { Notification } from 'element-ui'
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
    solution: null
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
      try {
        if (process.env.NODE_ENV !== 'production') {
          console.time('solutionTimeTaken')
        }
        const solution = this.chosenMethod(this.grid)
        if (process.env.NODE_ENV !== 'production') {
          console.timeEnd('solutionTimeTaken')
          console.log(solution)
        }
        const normalizeArray = arr => JSON.stringify(arr.map(i => i + 1))
        this.solution = solution.map(map(normalizeArray))
        Notification({
          title: 'Success',
          message: 'Solution found',
          type: 'success'
        })
      } catch (err) {
        Notification({
          title: 'Error',
          message: err.message
        })
      }
    }
  }
}
</script>

<template lang="pug">
  .root
    router-link(to='/')
      i.el-icon-caret-left
    .solver
      EightPuzzle(:grid.sync='grid')
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
    .solution
      h5 Solution
      ElTable.solution(:data='solution' border max-height='580')
        ElTableColumn(prop='from' label='From')
        ElTableColumn(prop='to' label='To')
        p(slot='empty') {{ solution ? '8-Puzzle is already solved' : "Solution will be displayed here" }}
    router-link(to='/ai/wumpus-world')
      i.el-icon-caret-right
</template>

<style scoped lang="postcss">
.root {
  color: #5e6d82;
  font-size: 3.6vmin;
  display: flex;
  justify-content: space-evenly;
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
    margin: 0 10px;
    text-align: center;

    & > h5 {
      margin-bottom: 10px;
    }
  }
}
</style>
