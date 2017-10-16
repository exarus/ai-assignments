import createNode from '@/ai/8-puzzle/createNode'
import minBy from 'ramda/src/minBy'
import { isSolved } from '@/ai/8-puzzle/heuristics'
import { toResult } from '@/ai/8-puzzle/util'

const depthLimitedSearch = (node, test, depthLimit, closedNodes) => {
  if (test(node.state)) {
    return { result: node }
  } else if (depthLimit) {
    const openNeighbors = node
      .neighborNodes()
      .filter(n => !closedNodes.has(n.stateId()))
    const results = openNeighbors
      .map(neighbor =>
        depthLimitedSearch(
          neighbor,
          test,
          depthLimit - 1,
          new Set(closedNodes).add(node.stateId())
        )
      )
      .filter(({ cutOff }) => !cutOff)
    return results.length
      ? results.reduce(minBy(({ result }) => result.depth))
      : { cutOff: true }
  } else {
    return { cutOff: true }
  }
}

const iterativeDepthLimitedSearch = (state, [depthLimit, ...nextLimits] = [14, 15]) => {
  const result = depthLimitedSearch(createNode({ state }), isSolved, depthLimit, new Set())
  if (!result.cutOff) {
    return toResult(result.result)
  } else if (nextLimits.length) {
    return iterativeDepthLimitedSearch(state, nextLimits)
  } else {
    throw new Error(`Computation exceeds depth limit of ${depthLimit}`)
  }
}

export default iterativeDepthLimitedSearch
