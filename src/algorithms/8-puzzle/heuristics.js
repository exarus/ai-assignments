import adjust from 'ramda/src/adjust'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
import flatten from 'ramda/src/flatten'
import sum from 'ramda/src/sum'
import update from 'ramda/src/update'
import zipWith from 'ramda/src/zipWith'
import { cellIndices, defaultGrid, emptyCell as emptyCellValue } from '@/algorithms/8-puzzle/util'

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
  const emptyCell = cellIndices(grid, emptyCellValue)
  const [x, y] = emptyCell
  const maxIndex = grid.length - 1
  const movedCells = []
  if (x !== 0) {
    movedCells.push([x - 1, y])
  }
  if (x !== maxIndex) {
    movedCells.push([x + 1, y])
  }
  if (y !== 0) {
    movedCells.push([x, y - 1])
  }
  if (y !== maxIndex) {
    movedCells.push([x, y + 1])
  }
  return movedCells.map(movedCell => ({
    from: movedCell,
    to: emptyCell,
    grid: withSwappedCells(grid, movedCell, emptyCell)
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
