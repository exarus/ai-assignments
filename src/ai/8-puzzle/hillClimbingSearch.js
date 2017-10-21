import min from 'ramda/src/min'
import prop from 'ramda/src/prop'
import propEq from 'ramda/src/propEq'
import sum from 'ramda/src/sum'
import heuristics from '@/ai/8-puzzle/heuristics'
import { neighborStates, toResult } from '@/ai/8-puzzle/util'
import { pickRandom } from '@/util/random'

const chooseStochastically = (nodes) => {
  const solution = nodes.find(propEq('cost', 0))
  const costs = nodes.map(prop('cost'))
  const costsSum = sum(costs)
  return solution || pickRandom(
    nodes,
    costs.map(cost => costsSum / cost)
  )
}

// TODO rewrite tail-recursive as loop cause browsers do not optimize tail call
const hillClimbingSearch = ({ state, parent, sideMovesLimit = 100 }) => {
  const stateCost = heuristics(state)
  if (!stateCost) {
    return { state, parent }
  }
  const neighbors = neighborStates(state).map(state => ({ state, cost: heuristics(state) }))
  const bestNeighborCost = neighbors.map(prop('cost')).reduce(min)
  if (bestNeighborCost < stateCost) {
    return hillClimbingSearch({
      state: chooseStochastically(neighbors).state,
      parent: { state, parent }
    })
  } else if (sideMovesLimit > 0) {
    return hillClimbingSearch({
      state: pickRandom(neighbors).state,
      parent: { state, parent },
      sideMovesLimit: sideMovesLimit - 1
    })
  } else {
    throw Error('Solution is stuck in local maximum')
  }
}

export default state => toResult(hillClimbingSearch({ state }))
