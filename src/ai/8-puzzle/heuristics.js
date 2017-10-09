import adjust from 'ramda/src/adjust'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
import flatten from 'ramda/src/flatten'
import sum from 'ramda/src/sum'
import update from 'ramda/src/update'
import zipWith from 'ramda/src/zipWith'
import { defaultGrid, emptyCellIndices, emptyCellNeighbors, emptyCellValue } from '@/util/8-puzzle'

export const goalState = defaultGrid

export const displacedCells = (grid) => {
  const displaced = zipWith(
    (c1, c2) => c1 === c2 ? 0 : 1,
    flatten(grid),
    flatten(defaultGrid)
  )
  return sum(displaced)
}

export const isSolved = grid => equals(grid, defaultGrid)

const withSwappedCells = (grid, [x1, y1], [x2, y2]) => {
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

export const possibleMoves = (grid) => {
  const emptyCell = emptyCellIndices(grid)
  return emptyCellNeighbors(grid).map(movableCell => ({
    from: movableCell,
    to: emptyCell,
    grid: withSwappedCells(grid, movableCell, emptyCell)
  }))
}

export const neighborStates = (state) => {
  const emptyCell = emptyCellIndices(state)
  return emptyCellNeighbors(state).map(cell => withSwappedCells(state, cell, emptyCell))
}

const toMove = (initState, destState) => {
  const to = emptyCellIndices(initState)
  const from = emptyCellNeighbors(initState).filter(
    ([x, y]) => destState[x][y] === emptyCellValue
  )[0]
  return { from, to }
}

export const toResult = ({ state, ancestors }) => (
  [...ancestors, state]
    .reduce(
      ({ result, prevState }, curState) => {
        if (prevState !== null) {
          result.push(toMove(prevState, curState))
        }
        return { result, prevState: curState }
      },
      { result: [], prevState: null }
    )
    .result
)
