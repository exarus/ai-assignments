import maxBy from 'ramda/src/maxBy'
import { displacedCells, neighborStates, toMove } from '@/ai/8-puzzle/heuristics'

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

const toResult = ({ state, ancestors }) => (
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

export default state => toResult(hillClimbingSearch({ state }))
