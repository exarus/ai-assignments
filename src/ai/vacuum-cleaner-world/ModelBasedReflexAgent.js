import equals from 'ramda/src/equals'
import { pickRandom } from '@/util/random'
import { getMoveDestination } from './util'
import actions, { moveActions } from './actions'
import { isMove } from '@/ai/vacuum-cleaner-world/actions'
import { getMoveOrigin } from '@/ai/vacuum-cleaner-world/util'

export default () => {
  const exploredGrid = Array(19).fill((() => Array(19).fill(null))())
  exploredGrid[9][9] = { isWall: false }

  let lastMove
  let position = [9, 9]

  const suck = () => {
    this.energySpent += 2
    return actions.suck
  }

  const moveOrIdle = () => {
    const possibleMoves = moveActions
      .map(m => getMoveDestination(m, position))
      .filter(([x, y]) => !(exploredGrid[x][y] && exploredGrid[x][y].isWall))
    if (possibleMoves.length) {
      const bestMoves = possibleMoves.filter(m =>
        !(lastMove && equals(m, getMoveOrigin(lastMove, position)))
      )
      lastMove = pickRandom(bestMoves.length ? bestMoves : possibleMoves)
      this.energySpent += 1
      return lastMove
    } else {
      return actions.idle
    }
  }

  return {
    energySpent: 0,
    perceive ({ bumpOccurred, isDirty }) {
      if (isMove(lastMove)) {
        const [x, y] = getMoveDestination(lastMove, position)
        if (bumpOccurred) {
          exploredGrid[x][y] = exploredGrid[x][y] || { isWall: true }
        } else {
          exploredGrid[x][y] = exploredGrid[x][y] || { isWall: false }
          position = [x, y]
        }
      }
      return isDirty ? suck() : moveOrIdle()
    }
  }
}
