import pipe from 'ramda/src/pipe'
import minBy from 'ramda/src/minBy'
import { displacedCells, isSolved, possibleMoves, goalState } from '@/ai/8-puzzle/heuristics'
import curry from 'ramda/src/curry'

const estimatedCost = curry(
  (costToState, costToEnd, goalState, initialState, state) => (
    7 * Math.abs(costToState(state) - costToState(initialState)) +
    (costToEnd(state) - costToEnd(goalState))
  )
)

const costToState = node => node.ancestors.length

const costToEnd = node => displacedCells(node.grid)

export default (initGrid) => {
  const initState = {
    grid: initGrid,
    ancestors: []
  }
  const puzzleEstimatedCost = estimatedCost(costToState, costToEnd, goalState, initState)

  const nodes = []
  let curNode = {
    ...initState,
    cost: puzzleEstimatedCost(initState)
  }
  while (true) {
    process.env.NODE_ENV !== 'production' && console.log({ depth: curNode.ancestors.length, cost: curNode.cost })
    if (isSolved(curNode.grid)) {
      return nodeToMoves(curNode)
    }
    const children = possibleMoves(curNode.grid)
    children.forEach((m) => {
      m.ancestors = [...curNode.ancestors, curNode]
      m.cost = puzzleEstimatedCost(m)
    })
    nodes.push(...children)
    curNode = nodes.reduce(minBy(n => n.cost))
    nodes.splice(nodes.indexOf(curNode), 1)
  }
}

const nodeToMoves = pipe(
  node => [...node.ancestors, node],
  ancestors => ancestors.slice(1),
  ancestors => ancestors.map(
    ({ from, to }) => ({ from, to })
  )
)
