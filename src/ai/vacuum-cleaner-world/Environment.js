import deepFreeze from 'deep-freeze'
import clone from 'ramda/src/clone'
import prop from 'ramda/src/prop'
import actions, { isMove } from './actions'

export default () => {
  const grid = clone(defaultEnvironmentGrid)
  return {
    grid,
    acceptAction: (action) => {
      const { bumpOccurred = false } = isMove(action) ? applyMove(grid, action) : {}
      return { bumpOccurred, isDirty: getVacuumCleanerCell(grid).isDirty }
    },
    get percept () {
      return {
        bumpOccurred: false,
        isDirty: getVacuumCleanerCell(grid).isDirty
      }
    }
  }
}

const createCell = ({ isDirty = false, isClean = !isDirty, isWall = false, hasVacuumCleaner = false }) => {
  if (isClean && isDirty) {
    throw Error("Cell can't be both clean and dirty")
  } if (isWall && isDirty) {
    throw Error("Walls can't be dirty")
  } else if (isWall && hasVacuumCleaner) {
    throw Error("Vacuum cleaner can't be placed in the wall")
  }
  return {
    isWall,
    hasVacuumCleaner,
    get isClean () {
      return isClean
    },
    set isClean (clean) {
      isClean = clean
      isDirty = !clean
    },
    get isDirty () {
      return isDirty
    },
    set isDirty (dirty) {
      isClean = !dirty
      isDirty = dirty
    }
  }
}

const defaultEnvironmentGrid = deepFreeze(`
██████████
█        █
█ ██████ █
█ █      █
█ █    █ █
█ █  @ █ █
█ █    █ █
█ ██ ███ █
█        █
██████████
`.trim().split('\n').map(line =>
    [...line].map(c => ({
      ' ': createCell({ isClean: true }),
      '█': createCell({ isWall: true }),
      '@': createCell({ hasVacuumCleaner: true })
    }[c]))
  )
)

const applyMove = (grid, action) => {
  const oldPosition = getVacuumCleanerPosition(grid)
  const newPosition = getMoveDestination(action, oldPosition)
  const [newX, newY] = newPosition
  const newCell = grid[newX][newY]

  if (newCell.isWall) {
    return { bumpOccurred: true }
  } else {
    newCell.hasVacuumCleaner = true
    getVacuumCleanerCell(grid).hasVacuumCleaner = false
    return { bumpOccurred: false }
  }
}

const getMoveDestination = (move, [x, y]) => new Map([
  [actions.moveNorth, [x - 1, y]],
  [actions.moveSouth, [x + 1, y]],
  [actions.moveWest, [x, y - 1]],
  [actions.moveEast, [x, y + 1]]
]).get(move)

const getVacuumCleanerPosition = grid => grid.reduce(
  (result, row, i) => {
    const j = row.findIndex(prop('hasVacuumCleaner'))
    return j !== -1 ? [i, j] : result
  }
)

const getVacuumCleanerCell = (grid) => {
  const [x, y] = getVacuumCleanerPosition(grid)
  return grid[x][y]
}
