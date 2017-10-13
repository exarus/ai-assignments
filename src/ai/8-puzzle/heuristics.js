import adjust from 'ramda/src/adjust'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
import flatten from 'ramda/src/flatten'
import sum from 'ramda/src/sum'
import update from 'ramda/src/update'
import zipWith from 'ramda/src/zipWith'
import { cellIndices, defaultGrid, emptyCellIndices, emptyCellNeighbors, emptyCellValue, manhattanDistance } from '@/util/8-puzzle'

export const goalState = defaultGrid

export const displacedTiles = (grid) => {
  const displaced = zipWith(
    (c1, c2) => c1 === c2 ? 0 : 1,
    flatten(grid),
    flatten(defaultGrid)
  )
  return sum(displaced)
}

export const totalManhattanDistance = (state) => {
  let total = 0
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      const goalTileValue = i * state.length + j + 1
      if (goalTileValue !== emptyCellValue) {
        total += manhattanDistance(cellIndices(state, goalTileValue), [i, j])
      }
    }
  }
  return total
}

export const linearConflict = (state) => {
  let total = 0
  const size = state.length

  // row conflicts
  for (let i = 0; i < size; i++) {
    let shouldBeShiftedLeft = false
    let shouldBeShiftedRight = false
    for (let j = 0; j < size; j++) {
      if (state[i][j] > i * size && state[i][j] < (i + 1) * size) {
        const goalTileValue = i * size + j + 1
        if (goalTileValue !== emptyCellValue) {
          shouldBeShiftedLeft = shouldBeShiftedLeft || goalTileValue > state[i][j]
          shouldBeShiftedRight = shouldBeShiftedRight || goalTileValue < state[i][j]
        }
      }
    }
    if (shouldBeShiftedLeft && shouldBeShiftedRight) {
      total += 2
    }
  }

  // column conflicts
  for (let i = 0; i < size; i++) {
    let shouldBeShiftedUp = false
    let shouldBeShiftedDown = false
    for (let j = 0; j < size; j++) {
      if (state[j][i] > j * size && state[j][i] < (j + 1) * size) {
        const goalTileValue = j * size + i + 1
        if (goalTileValue !== emptyCellValue) {
          shouldBeShiftedUp = shouldBeShiftedUp || goalTileValue > state[j][i]
          shouldBeShiftedDown = shouldBeShiftedDown || goalTileValue < state[j][i]
        }
      }
    }
    if (shouldBeShiftedDown && shouldBeShiftedUp) {
      total += 2
    }
  }

  return total
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
