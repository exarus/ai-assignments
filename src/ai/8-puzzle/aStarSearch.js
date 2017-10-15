import SortedSet from 'bintrees/lib/rbtree'
import estimatedCost from '@/ai/8-puzzle/heuristics'
import { neighborStates, stateComparator, toResult } from '@/ai/8-puzzle/util'

const isSolved = node => node.cost === 0

/**
 * Is needed to create a sorted tree set. Returns one of [-1, 0, 1]
 * @returns {number}
 */
const nodeComparator = ({ cost: cost1, state: state1 }, { cost: cost2, state: state2 }) => {
  const costDiff = cost1 - cost2
  return costDiff !== 0 ? costDiff : stateComparator(state1, state2)
}

export default (initState) => {
  const openNodes = new SortedSet(nodeComparator)
  const closedNodes = new SortedSet(nodeComparator)
  let bestNode = {
    state: initState,
    ancestors: [],
    cost: estimatedCost(initState)
  }
  // TODO rewrite loop as tail-recursive when browsers will optimize tail call
  while (true) {
    if (process.env.NODE_ENV !== 'production') {
      console.log({ depth: bestNode.ancestors.length, cost: bestNode.cost })
    }
    if (isSolved(bestNode)) {
      return toResult(bestNode)
    }
    closedNodes.insert(bestNode)
    neighborStates(bestNode.state)
      .map((state) => {
        const ancestors = [...bestNode.ancestors, bestNode.state]
        const cost = estimatedCost(state)
        return { state, ancestors, cost }
      })
      .forEach((neighbor) => {
        if (!(openNodes.find(neighbor) || closedNodes.find(neighbor))) {
          openNodes.insert(neighbor)
        }
      })
    bestNode = openNodes.min()
    openNodes.remove(bestNode)
  }
}
