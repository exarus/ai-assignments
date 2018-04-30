import equals from 'ramda/src/equals'
import aStarSearch from '@/ai/8-puzzle/aStarSearch'
const initState = [
  [7, 6, 2],
  [8, 9, 5],
  [4, 3, 1]
]

const expectedSolution = [
  {from: [0, 1], to: [1, 1]},
  {from: [0, 2], to: [0, 1]},
  {from: [1, 2], to: [0, 2]},
  {from: [2, 2], to: [1, 2]},
  {from: [2, 1], to: [2, 2]},
  {from: [1, 1], to: [2, 1]},
  {from: [1, 2], to: [1, 1]},
  {from: [0, 2], to: [1, 2]},
  {from: [0, 1], to: [0, 2]},
  {from: [1, 1], to: [0, 1]},
  {from: [1, 2], to: [1, 1]},
  {from: [2, 2], to: [1, 2]},
  {from: [2, 1], to: [2, 2]},
  {from: [2, 0], to: [2, 1]},
  {from: [1, 0], to: [2, 0]},
  {from: [0, 0], to: [1, 0]},
  {from: [0, 1], to: [0, 0]},
  {from: [0, 2], to: [0, 1]},
  {from: [1, 2], to: [0, 2]},
  {from: [1, 1], to: [1, 2]},
  {from: [2, 1], to: [1, 1]},
  {from: [2, 0], to: [2, 1]},
  {from: [1, 0], to: [2, 0]},
  {from: [1, 1], to: [1, 0]},
  {from: [1, 2], to: [1, 1]},
  {from: [2, 2], to: [1, 2]}
]

const actual = aStarSearch(initState)
console.log(equals(actual, expectedSolution))
