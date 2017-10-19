import { pickRandom } from '@/util/random'
import actions, { moveActions } from './actions'

export default () => {
  const suck = () => {
    this.energySpent += 2
    return actions.suck
  }
  const move = () => {
    this.energySpent++
    return pickRandom(moveActions)
  }
  return {
    energySpent: 0,
    perceive ({ isDirty }) {
      return isDirty ? suck() : move()
    }
  }
}
