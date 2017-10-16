import createNode from '@/ai/8-puzzle/createNode'
import FibonacciHeap from 'mnemonist/fibonacci-heap'
import estimatedCost from '@/ai/8-puzzle/heuristics'
import { stateComparator, toResult } from '@/ai/8-puzzle/util'

const isSolved = node => node.cost === 0

/**
 * Is needed to create a sorted tree set. Returns one of [-1, 0, 1]
 * @returns {number}
 */
const nodeComparator = ({ cost: cost1, state: state1 }, { cost: cost2, state: state2 }) => {
  const costDiff = cost1 - cost2
  return costDiff !== 0 ? costDiff : stateComparator(state1, state2)
}

export default (state) => {
  const openNodesHeap = new FibonacciHeap(nodeComparator)
  const openNodesMap = new Map()
  const closedNodesMap = new Map()
  let bestNode = {
    ...createNode({ state }),
    cost: estimatedCost(state)
  }
  // TODO rewrite loop as tail-recursive when browsers will optimize tail call
  while (true) {
    if (process.env.NODE_ENV !== 'production') {
      console.log({ cost: bestNode.cost, depth: bestNode.depth })
    }
    if (isSolved(bestNode)) {
      return toResult(bestNode)
    }
    closedNodesMap.set(bestNode.stateId(), bestNode)
    bestNode.neighborNodes()
      .map((neighbor) => {
        const cost = estimatedCost(neighbor.state)
        return { ...neighbor, cost }
      })
      .forEach((neighbor) => {
        const key = neighbor.stateId()
        if (!openNodesMap.has(key) && !closedNodesMap.has(key)) {
          openNodesHeap.push(neighbor)
          openNodesMap.set(key, neighbor)
        }
      })
    bestNode = openNodesHeap.pop()
    openNodesMap.delete(bestNode.stateId())
  }
}
