import maxBy from 'ramda/src/maxBy'
import { displacedTiles, neighborStates, toResult } from '@/ai/8-puzzle/heuristics'

const heuristics = state => -displacedTiles(state)

const hillClimbingSearch = ({ state, ancestors = [] }) => {
  const bestNeighborState = neighborStates(state).reduce(maxBy(heuristics))
  if (heuristics(bestNeighborState) > heuristics(state)) {
    return hillClimbingSearch({
      state: bestNeighborState,
      ancestors: [...ancestors, state]
    })
  } else {
    return { state, ancestors }
  }
}

export default state => toResult(hillClimbingSearch({ state }))
