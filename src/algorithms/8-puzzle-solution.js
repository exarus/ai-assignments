import last from 'ramda/src/last'
import sum from 'ramda/src/sum'
import flatten from 'ramda/src/flatten'
import zipWith from 'ramda/src/zipWith'
import append from 'ramda/src/append'

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

const displacedCells = (grid) => {
  const displaced = zipWith(
    (c1, c2) => c1 === c2 ? 0 : 1,
    flatten(grid),
    flatten(defaultGrid)
  )
  return sum(displaced)
}

// const hillClimbing = (grid, target) => {
//
// }

export const cellIndices = (grid, cell) => {
  for (let i = 0; i < grid.length; i++) {
    const j = grid[i].indexOf(cell)
    if (j !== -1) {
      return [i, j]
    }
  }
}

const possibleMoves = (grid) => {
  const [x, y] = cellIndices(grid, emptyCell)
  const maxIndex = grid.length - 1
  const moves = []
  if (x !== 0) {
    moves.push([x - 1, y])
  }
  if (x !== maxIndex) {
    moves.push([x + 1, y])
  }
  if (y !== 0) {
    moves.push([x, y - 1])
  }
  if (y !== maxIndex) {
    moves.push([x, y + 1])
  }
  return moves
}

const ldfs = (state, depthLimit, stack, iteratee) => {
  while (depthLimit--) {
    const [x1, y1] = cellIndices(state, emptyCell)
    const moves = possibleMoves(state)
    for (const [x2, y2] of moves) {
      const nextState = Object.assign([...state], {
        [x1]: Object.assign([...state[x1]], {
          [y1]: state[x2][y2],
          [x1 === x2 ? y2 : undefined]: state[x1][y1]
        }),
        [x2]: Object.assign([...state[x2]], {
          [x1 === x2 ? y1 : undefined]: state[x2][y2],
          [y2]: state[x1][y1]
        })
      })
      iteratee(stack, nextState)
    }
  }
}

export default (grid) => {
  ldfs(grid, 1, [], (stack, state) => append(displacedCells(state), stack))
}
