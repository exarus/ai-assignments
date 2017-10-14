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

const depthLimitedSearch = (grid, test, depthLimit, stack, closedList) => {
  if (test(grid)) {
    return {
      result: stack.map(({ from, to }) => ({ from, to }))
    }
  } else {
    closedList.insert(grid)
    if (stack.length === depthLimit) {
      return { cutOff: true }
    } else {
      const results = possibleMoves(grid)
        .filter(({ grid }) => !closedList.find(grid))
        .map(move => depthLimitedSearch(move.grid, test, depthLimit, [...stack, move], closedList))
        .filter(({ cutOff }) => !cutOff)
      return results.length
        ? results.reduce(minBy(({ result }) => result.length))
        : { cutOff: true }
    }
  }
}

export default (grid) => {
  for (let i = 24; i < 32; i++) {
    const closedList = new SortedSet(stateComparator)
    const result = depthLimitedSearch(grid, isSolved, i, [], closedList)
    if (!result.cutOff) {
      return result.result
    }
  }
  return new Error('Computation will take too long')
}
