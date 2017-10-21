import min from 'ramda/src/min'
import prop from 'ramda/src/prop'
import propEq from 'ramda/src/propEq'
import sum from 'ramda/src/sum'
import heuristics from '@/ai/8-puzzle/heuristics'
import { neighborStates, toMove } from '@/ai/8-puzzle/util'
import { pickRandom } from '@/util/random'

const toResult = ({ state, ancestors }) => {
  return ancestors.reduceRight(
    ({ moves, to }, from) => ({
      moves: [toMove(from, to), ...moves],
      to: from
    }),
    { moves: [], to: state }
  ).moves
}

const chooseStochastically = (nodes) => {
  const solution = nodes.find(propEq('cost', 0))
  const costs = nodes.map(prop('cost'))
  const costsSum = sum(costs)
  return solution || pickRandom(
    nodes,
    costs.map(cost => costsSum / cost)
  )
}

const defaultSideMovesLimit = 100

const hillClimbingSearch = (state) => {
  const ancestors = []
  let sideMovesLimit = defaultSideMovesLimit
  while (true) {
    const stateCost = heuristics(state)
    if (!stateCost) {
      return { state, ancestors }
    }
    const neighbors = neighborStates(state).map(state => ({ state, cost: heuristics(state) }))
    const bestNeighborCost = neighbors.map(prop('cost')).reduce(min)

    if (bestNeighborCost < stateCost) {
      ancestors.push(state)
      state = chooseStochastically(neighbors).state
      sideMovesLimit = defaultSideMovesLimit
    } else if (sideMovesLimit > 0) {
      ancestors.push(state)
      state = pickRandom(neighbors).state
      sideMovesLimit = sideMovesLimit - 1
    } else {
      throw Error('Solution is stuck in local minimum')
    }
  }
}

export default state => toResult(hillClimbingSearch(state))
