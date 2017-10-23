import adjust from 'ramda/src/adjust'
import compose from 'ramda/src/compose'
import update from 'ramda/src/update'
import trampa from 'trampa'
import { emptyCellIndices, emptyCellNeighbors, emptyCellValue } from '@/util/8-puzzle'

export const stateComparator = (state1, state2) => {
  for (let i = 0; i < state1.length; i++) {
    for (let j = 0; j < state1[i].length; j++) {
      let stateDiff = state1[i][j] - state2[i][j]
      if (stateDiff !== 0) {
        return stateDiff
      }
    }
  }
  return 0
}

export const withSwappedCells = (grid, [x1, y1], [x2, y2]) => {
  const applySwap = (x1 === x2)
    ? adjust(
      compose(
        update(y1, grid[x2][y2]),
        update(y2, grid[x1][y1])
      ),
      x1
    )
    : compose(
      adjust(update(y1, grid[x2][y2]), x1),
      adjust(update(y2, grid[x1][y1]), x2)
    )
  return applySwap(grid)
}

export const neighborStates = (state) => {
  const emptyCell = emptyCellIndices(state)
  return emptyCellNeighbors(state).map(cell => withSwappedCells(state, cell, emptyCell))
}

export const toMove = (initState, destState) => {
  const to = emptyCellIndices(initState)
  const from = emptyCellNeighbors(initState).filter(
    ([x, y]) => destState[x][y] === emptyCellValue
  )[0]
  return { from, to }
}

// TODO rewrite as tail recursive when JS-engines will support that
const toMoves = ({ state, parent }, movesQueue = []) => {
  return parent
    ? trampa.lazy(() => toMoves(parent, [toMove(parent.state, state), ...movesQueue]))
    : trampa.wrap(movesQueue)
}

export const toResult = o => toMoves(o).run()
