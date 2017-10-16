import sum from 'ramda/src/sum'
import flatten from 'ramda/src/flatten'
import { withSwappedCells } from '@/ai/8-puzzle/util'
import { emptyCellIndices, emptyCellNeighbors } from '@/util/8-puzzle'

const createNode = ({ state, parent = null, depth = 0 }) => ({
  state,
  size: state.length,
  parent,
  depth,
  stateId () {
    return sum(flatten(this.state).map((v, i) => (v - 1) << this.size * i))
  },
  neighborNodes () {
    const emptyCell = emptyCellIndices(state)
    return emptyCellNeighbors(state).map(cell => createNode({
      state: withSwappedCells(state, cell, emptyCell),
      parent: this,
      depth: depth + 1
    }))
  }
})

export default createNode
