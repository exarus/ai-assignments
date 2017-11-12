import equals from 'ramda/src/equals'
import { defaultGrid, shuffledGrid } from '@/util/8-puzzle'

export const gameComplexities = new Map([
  ['EASY', { label: 'Easy' }],
  ['MEDIUM', { label: 'Medium' }],
  ['HARD', { label: 'Hard' }]
])

export const gameSizes = new Map([
  [2, { label: '2' }],
  [3, { label: '3' }],
  [4, { label: '4' }]
])

export default class EightPuzzleGame {
  constructor () {
    this.grid = shuffledGrid(200)
  }

  isPuzzleSolved () {
    return equals(this.grid, defaultGrid)
  }
}
