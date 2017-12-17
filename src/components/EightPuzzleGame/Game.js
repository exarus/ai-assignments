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

const gameGridStorageKey = 'gameGrid'

export default class Game {
  constructor (grid = shuffledGrid(200)) {
    this.grid = grid
  }

  isPuzzleSolved () {
    return equals(this.grid, defaultGrid)
  }

  save () {
    localStorage.setItem(gameGridStorageKey, JSON.stringify(this.grid))
  }

  static load () {
    const storedGrid = localStorage.getItem(gameGridStorageKey)
    if (storedGrid === null) {
      throw Error('Game not saved')
    }
    const grid = JSON.parse(storedGrid)
    return new Game(grid)
  }
}
