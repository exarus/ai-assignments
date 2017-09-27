<template lang="pug">
  div.root
    div.assignment
      div.grid
        div.row(v-for='row in grid')
          div.cell(v-for='cell in row') {{cell}}
      el-button.solution(type='primary' size='large') Find solution
</template>
<script>
import { Button } from 'element-ui'
import _ from 'lodash-es'

const directions = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
}
const directionsCount = Object.keys(directions).length
const gridSize = 3

export default {
  data () {
    return {
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, null]
      ]
    }
  },
  created () {
    const cellBuffer = new Uint8Array(100)
    window.crypto.getRandomValues(cellBuffer)
    const cells = cellBuffer.map(i => i % (gridSize * gridSize))

    const directionBuffer = new Uint8Array(100)
    window.crypto.getRandomValues(directionBuffer)
    const directions = directionBuffer.map(i => i % directionsCount)

    const moves = _.zip(cells, directions)
    for (const [cell, direction] of moves) {
      this.tryMoveCellValue(cell, direction)
    }
  },
  methods: {
    getCell (id) {
      const [i, j] = this.cellIdToIndices()
      return this.grid[i][j]
    },
    setCell (id, value) {
      const [i, j] = this.cellIdToIndices()
      this.grid[i][j] = value
    },
    tryMoveCellValue (id, direction) {
      const [i, j] = this.cellIdToIndices(id)
      let newI = i
      let newJ = j
      switch (direction) {
        case directions.TOP:
          newI = i + 1
          break
        case directions.BOTTOM:
          newI = i - 1
          break
        case directions.LEFT:
          newJ = j - 1
          break
        case directions.RIGHT:
          newJ = j + 1
          break
        default:
          throw new Error(`Invalid direction: ${direction}`)
      }

      const min = 0
      const max = gridSize * gridSize - 1
      if (newI >= min && newI <= max && newJ >= min && newJ <= max) {
        const tmp = this.grid[i][j]
        this.grid[i][j] = this.grid[newI][newJ]
        this.grid[newI][newJ] = tmp
        return true
      }
      return false
    },
    cellIdToIndices (id) {
      const i = (id < gridSize)
        ? 0
        : (id < gridSize * 2) ? 1 : 2
      const j = id % gridSize
      return [i, j]
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>
<style lang="stylus" scoped>
  .root
    color: #5e6d82
    font-size 3.6vmin
    display flex
    justify-content center
    align-items center
  .assignment
    display flex
    flex-direction column
    justify-content space-evenly
    align-items center
  .grid
    background #e6eefb
    border 0.8vmin solid #c3c3c3
    display flex
    flex-direction column
    justify-content space-evenly
    /*align-items center*/
    height 74.2vmin
    width 74.2vmin
  .row
    display flex
    justify-content space-evenly
    align-items center
  .cell
    border 0.8vmin solid #c3c3c3 /*#2b2b2b*/
    margin -0.8vmin
    display flex
    justify-content center
    align-items center
    width: 24.2vmin
    height 24.2vmin
    font-size: min(4em, 24.2vmin)
  .solution
    margin 1vmin
    width 100%
    font-size: 2em
</style>
