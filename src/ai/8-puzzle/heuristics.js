import adjust from 'ramda/src/adjust'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
import flatten from 'ramda/src/flatten'
import sum from 'ramda/src/sum'
import update from 'ramda/src/update'
import zipWith from 'ramda/src/zipWith'
import { defaultGrid, emptyCellIndices, emptyCellNeighbors } from '@/util/8-puzzle'

export const goalState = { grid: defaultGrid }

export const displacedCells = (grid) => {
  const displaced = zipWith(
    (c1, c2) => c1 === c2 ? 0 : 1,
    flatten(grid),
    flatten(defaultGrid)
  )
  return sum(displaced)
}

export const isSolved = grid => equals(grid, defaultGrid)

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
