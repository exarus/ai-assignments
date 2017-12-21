import equals from 'ramda/src/equals'
import { defaultGrid, shuffledGrid } from '@/util/8-puzzle'

export const gameComplexities = new Map([
  ['EASY', { label: 'Easy', shuffleCount: 13 }],
  ['MEDIUM', { label: 'Medium', shuffleCount: 35 }],
  ['HARD', { label: 'Hard', shuffleCount: 150 }]
])

export const gameSizes = new Map([
  [2, { label: '2' }],
  [3, { label: '3' }],
  [4, { label: '4' }]
])

export default class Game {
  constructor ({
    grid,
    saver,
    complexity = 200,
    size = 3
  }) {
    this.saver = saver
    if (grid) {
      this.grid = grid
    } else {
      const { shuffleCount } = gameComplexities.get(complexity)
      this.grid = shuffledGrid({ shuffleCount, size })
    }
  }

  isPuzzleSolved () {
    return equals(this.grid, defaultGrid)
  }

  save () {
    const grid = this.grid
    this.saver.save({ grid })
  }
}
