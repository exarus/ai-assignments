import clone from 'ramda/src/clone'
import last from 'ramda/src/last'
import { pickRandom } from '@/util/secureRandom'

export const defaultGrid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

export const emptyCellValue = last(last(defaultGrid))

export const manhattanDistance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y2 - y1)

export const cellIndices = (grid, cell) => {
  for (let i = 0; i < grid.length; i++) {
    const j = grid[i].indexOf(cell)
    if (j !== -1) {
      return [i, j]
    }
  }
}

export const emptyCellIndices = (grid) => {
  return cellIndices(grid, emptyCellValue)
}

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

const swapCells = (grid, [x1, y1], [x2, y2]) => {
  [grid[x1][y1], grid[x2][y2]] = [grid[x2][y2], grid[x1][y1]]
}

export const shuffledGrid = (moveCount) => {
  const grid = clone(defaultGrid)
  for (let i = 0; i < moveCount; i++) {
    const neighbors = emptyCellNeighbors(grid)
    const randomNeighbor = pickRandom(neighbors)
    swapCells(grid, emptyCellIndices(grid), randomNeighbor)
  }
  return grid
}
