import SortedSet from 'bintrees/lib/rbtree'
import { totalManhattanDistance, linearConflict, neighborStates, toResult } from '@/ai/8-puzzle/heuristics'

// const estimatedCostFactory = (costToState, costToEnd, goalNode, initNode) => {
//   const initStateCost = costToState(initNode)
//   const goalStateCost = costToEnd(goalNode)
//   return node => (
//     Math.abs(costToState(node) - initStateCost) +
//     (costToEnd(node) - goalStateCost)
//   )
// }
// const costToState = node => totalManhattanDistance(node.state) + linearConflict(node.state)
// const costToEnd = node => totalManhattanDistance(node.state) + linearConflict(node.state)
const isSolved = node => node.cost === 0
const estimatedCost = node => totalManhattanDistance(node.state) + linearConflict(node.state)

/**
 * Compares 2 nodes. Is needed to create a sorted tree set.
 * @returns {number}
 */
const nodeComparator = ({ cost: cost1, state: state1 }, { cost: cost2, state: state2 }) => {
  const costDiff = cost1 - cost2
  if (costDiff === 0) {
    for (let i = 0; i < state1.length; i++) {
      for (let j = 0; j < state1[i].length; j++) {
        let stateDiff = state1[i][j] - state2[i][j]
        if (stateDiff !== 0) {
          return stateDiff
        }
      }
    }
    return 0
  }
  return costDiff
}

export default (initState) => {
  const openNodes = new SortedSet(nodeComparator)
  const closedNodes = new SortedSet(nodeComparator)
  let bestNode = {
    state: initState,
    ancestors: [],
    cost: estimatedCost({ state: initState })
  }
  // TODO rewrite loop as tail-recursive when browsers will optimize tail call
  while (true) {
    if (process.env.NODE_ENV !== 'production') {
      console.log({ depth: bestNode.ancestors.length, cost: bestNode.cost })
    }
    if (isSolved(bestNode)) {
      return toResult(bestNode)
    }
    neighborStates(bestNode.state)
      .map((state) => {
        const ancestors = [...bestNode.ancestors, bestNode.state]
        const cost = estimatedCost({ state, ancestors })
        return { state, ancestors, cost }
      })
      .forEach((neighbor) => {
        if (openNodes.find(neighbor) === null && closedNodes.find(neighbor) === null) {
          openNodes.insert(neighbor)
        }
      })
    closedNodes.insert(bestNode)
    bestNode = openNodes.min()
    openNodes.remove(bestNode)
  }
}
