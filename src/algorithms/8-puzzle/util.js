import last from 'ramda/src/last'

export const defaultGrid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

export const emptyCell = last(last(defaultGrid))

export const manhattanDistance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y2 - y1)

export const swapCells = (grid, [x1, y1], [x2, y2]) => {
  const max = grid.length - 1
  const noOverflow =
    x1 >= 0 && x1 <= max && y1 >= 0 && y1 <= max &&
    x2 >= 0 && x2 <= max && y2 >= 0 && y2 <= max
  const distance = manhattanDistance([x1, y1], [x2, y2])
  if (noOverflow && distance === 1) {
    [grid[x1][y1], grid[x2][y2]] = [grid[x2][y2], grid[x1][y1]]
  } else {
    throw Error('Only adjacent cells can be swapped.')
  }
}

export const cellIndices = (grid, cell) => {
  for (let i = 0; i < grid.length; i++) {
    const j = grid[i].indexOf(cell)
    if (j !== -1) {
      return [i, j]
    }
  }
}
