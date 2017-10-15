import SortedSet from 'bintrees/lib/rbtree'
import minBy from 'ramda/src/minBy'
import { isSolved } from '@/ai/8-puzzle/heuristics'
import { stateComparator, withSwappedCells } from '@/ai/8-puzzle/util'
import { emptyCellIndices, emptyCellNeighbors } from '@/util/8-puzzle'

const possibleMoves = (grid) => {
  const emptyCell = emptyCellIndices(grid)
  return emptyCellNeighbors(grid).map(movableCell => ({
    from: movableCell,
    to: emptyCell,
    grid: withSwappedCells(grid, movableCell, emptyCell)
  }))
}

const depthLimitedSearch = (grid, test, depthLimit, stack, closedStates) => {
  if (test(grid)) {
    return {
      result: stack.map(({ from, to }) => ({ from, to }))
    }
  } else if (stack.length === depthLimit) {
    return { cutOff: true }
  } else {
    const openMoves = possibleMoves(grid).filter(({ grid }) => !closedStates.find(grid))
    closedStates.insert(grid)
    const results = openMoves
      .map(move => depthLimitedSearch(move.grid, test, depthLimit, [...stack, move], Object.assign({}, closedStates)))
      .filter(({ cutOff }) => !cutOff)
    return results.length
      ? results.reduce(minBy(({ result }) => result.length))
      : { cutOff: true }
  }
}

const iterativeDepthLimitedSearch = (grid, [limit, ...nextLimit] = [24, 28, 31]) => {
  const closedStates = new SortedSet(stateComparator)
  const result = depthLimitedSearch(grid, isSolved, limit, [], closedStates)
  if (!result.cutOff) {
    return result.result
  } else if (nextLimit.length) {
    return iterativeDepthLimitedSearch(grid, nextLimit)
  } else {
    throw new Error(`Computation exceeds depth limit of ${limit}`)
  }
}

export default iterativeDepthLimitedSearch
