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
  constructor ({ grid = shuffledGrid(200) }) {
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
    const grid = storedGrid !== null ? JSON.parse(storedGrid) : defaultGrid
    return new Game({ grid })
  }
}
