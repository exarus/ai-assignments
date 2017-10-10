import minBy from 'ramda/src/minBy'
import { isSolved, possibleMoves } from '@/ai/8-puzzle/heuristics'

const depthLimitedSearch = (grid, test, depthLimit, stack) => {
  if (test(grid)) {
    return {
      result: stack.map(
        ({ from, to }) => ({ from, to })
      )
    }
  } else if (stack.length === depthLimit) {
    return { cutOff: true }
  } else {
    const searchResults = possibleMoves(grid).map(
      move => depthLimitedSearch(move.grid, test, depthLimit, [...stack, move])
    )
    if (searchResults.length === 0) {
      return { failure: true }
    }

    const filteredResults = searchResults.filter(({ cutOff }) => !cutOff)
    if (filteredResults.length === 0) {
      return { cutOff: true }
    }

    return filteredResults.reduce(minBy(r => r.result.length))
  }
}

export default (grid) => {
  for (let limit = 10; limit < 14; limit++) {
    process.env.NODE_ENV !== 'production' && console.log(`Limit is set to ${limit}`)
    const result = depthLimitedSearch(grid, isSolved, limit, [])
    if (result.failure) {
      return new Error('There is no solution!')
    } else if (!result.cutOff) {
      return result.result
    }
  }
  return new Error('Computation will take too long')
}
