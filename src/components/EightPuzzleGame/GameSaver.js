import Game from './Game'
import { defaultGrid } from '@/util/8-puzzle'

const gameGridStorageKey = 'gameGrid'

export default class GameSaver {
  save ({ grid }) {
    localStorage.setItem(gameGridStorageKey, JSON.stringify(grid))
  }

  load () {
    const storedGrid = localStorage.getItem(gameGridStorageKey)
    const grid = storedGrid !== null ? JSON.parse(storedGrid) : defaultGrid
    return new Game({ grid })
  }
}
