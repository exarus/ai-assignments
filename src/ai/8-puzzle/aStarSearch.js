import minBy from 'ramda/src/minBy'
import { displacedCells, isSolved, neighborStates, goalState, toResult } from '@/ai/8-puzzle/heuristics'

const estimatedCostFactory = (costToState, costToEnd, goalNode, initNode) => {
  const initStateCost = costToState(initNode)
  const goalStateCost = costToEnd(goalNode)
  return node => (
    (costToState(node) - initStateCost) +
    (costToEnd(node) - goalStateCost)
  )
}
const costToState = node => node.ancestors.length
const costToEnd = node => displacedCells(node.state)

export default (initState) => {
  const initNode = { state: initState, ancestors: [] }
  const estimatedCost = estimatedCostFactory(costToState, costToEnd, { state: goalState }, initNode)

  const nodes = []
  let curNode = {
    ...initNode,
    cost: estimatedCost(initNode)
  }
  while (true) {
    process.env.NODE_ENV !== 'production' && console.log({ depth: curNode.ancestors.length, cost: curNode.cost })
    if (isSolved(curNode.state)) {
      return toResult(curNode)
    }
    nodes.push(
      ...neighborStates(curNode.state).map((state) => {
        const ancestors = [...curNode.ancestors, curNode.state]
        const cost = estimatedCost({ state, ancestors })
        return { state, ancestors, cost }
      })
    )
    curNode = nodes.reduce(minBy(n => n.cost))
    nodes.splice(nodes.indexOf(curNode), 1)
  }
}
