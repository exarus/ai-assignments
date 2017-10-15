import minBy from 'ramda/src/minBy'
import heuristics from '@/ai/8-puzzle/heuristics'
import { neighborStates, toResult } from '@/ai/8-puzzle/util'

// TODO rewrite loop as tail-recursive when browsers will optimize tail call
const hillClimbingSearch = ({ state, ancestors = [], sideMovesLimit = 100 }) => {
  const neighbors = neighborStates(state)
  const bestNeighborState = neighbors.reduce(minBy(heuristics))
  if (heuristics(bestNeighborState) < heuristics(state)) {
    return hillClimbingSearch({
      state: bestNeighborState,
      ancestors: [...ancestors, state]
    })
  } else if (sideMovesLimit > 0) {
    return hillClimbingSearch({
      state: neighbors[0],
      ancestors: [...ancestors, state],
      sideMovesLimit: sideMovesLimit - 1
    })
  } else {
    throw Error('Solution is stuck in local maximum')
  }
}

export default state => toResult(hillClimbingSearch({ state }))
