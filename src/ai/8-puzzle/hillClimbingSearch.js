import maxBy from 'ramda/src/maxBy'
import { displacedCells, neighborStates } from '@/ai/8-puzzle/heuristics'

const heuristics = state => -displacedCells(state)

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

const toResult = ({ state, ancestors }) => {
  return {state, ancestors} // TODO
}

export default state => toResult(hillClimbingSearch({ state }))
