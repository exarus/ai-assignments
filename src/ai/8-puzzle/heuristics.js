import adjust from 'ramda/src/adjust'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
import flatten from 'ramda/src/flatten'
import sum from 'ramda/src/sum'
import update from 'ramda/src/update'
import zipWith from 'ramda/src/zipWith'
import { emptyCellIndices, defaultGrid } from '@/util/8-puzzle'
import curry from 'ramda/src/curry'

export const displacedCells = (grid) => {
  const displaced = zipWith(
    (c1, c2) => c1 === c2 ? 0 : 1,
    flatten(grid),
    flatten(defaultGrid)
  )
  return sum(displaced)
}

export const isSolved = grid => equals(grid, defaultGrid)

export const emptyCellNeighbors = (grid) => {
  const emptyCell = emptyCellIndices(grid)
  const [x, y] = emptyCell
  const maxIndex = grid.length - 1
  const neighbors = []
  if (x !== 0) {
    neighbors.push([x - 1, y])
  }
  if (x !== maxIndex) {
    neighbors.push([x + 1, y])
  }
  if (y !== 0) {
    neighbors.push([x, y - 1])
  }
  if (y !== maxIndex) {
    neighbors.push([x, y + 1])
  }
  return neighbors
}

export const possibleMoves = (grid) => {
  const emptyCell = emptyCellIndices(grid)
  const neighbors = emptyCellNeighbors(grid)
  return neighbors.map(movableCell => ({
    from: movableCell,
    to: emptyCell,
    grid: withSwappedCells(grid, movableCell, emptyCell)
  }))
}

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

export const estimatedCost = curry(
  (costToState, costToEnd, goalState, initialState, state) => (
    7 * Math.abs(costToState(state) - costToState(initialState)) +
    (costToEnd(state) - costToEnd(goalState))
  )
)

export { defaultGrid } from '@/util/8-puzzle'
