import minBy from 'ramda/src/minBy'
import actions, { moveActions } from './actions'
import { isMove } from '@/ai/vacuum-cleaner-world/actions'
import { getPositionAfterMove } from './util'

const initialPosition = Object.freeze([9, 9])

const createCell = () => ({ lastVisited: -Infinity })
const createRow = () => Array(19).fill(null).map(createCell)
const createGrid = () => {
  const grid = Array(19).fill(null).map(createRow)
  const [x, y] = initialPosition
  grid[x][y].isWall = false
  return grid
}

export default () => {
  const exploredGrid = createGrid()
  let position = initialPosition
  let iterationNum = 0
  let prevAction

  const getDestination = (action) => {
    const [x, y] = getPositionAfterMove(action, position)
    return exploredGrid[x][y]
  }

  const suck = () => {
    this.energySpent += 2
    return actions.suck
  }

  const moveOrIdle = () => {
    const possibleMoves = moveActions
      .map(action => ({ action, destination: getDestination(action) }))
      .filter(({ destination: { isWall = false } }) => !isWall)
    if (possibleMoves.length) {
      this.energySpent++
      return possibleMoves
        .reduce(minBy(({ destination: { lastVisited } }) => lastVisited))
        .action
    } else {
      return actions.idle
    }
  }

  const perceiveMove = (bumpOccurred) => {
    const [newX, newY] = getPositionAfterMove(prevAction, position)
    if (bumpOccurred) {
      exploredGrid[newX][newY].isWall = true
    } else {
      exploredGrid[newX][newY].isWall = false
      const [oldX, oldY] = position
      exploredGrid[oldX][oldY].lastVisited = iterationNum
      position = [newX, newY]
    }
  }

  return {
    energySpent: 0,
    perceive ({ bumpOccurred, isDirty }) {
      if (isMove(prevAction)) perceiveMove(bumpOccurred)
      prevAction = isDirty ? suck() : moveOrIdle()
      iterationNum++
      return prevAction
    }
  }
}
