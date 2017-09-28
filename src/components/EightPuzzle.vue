<template lang="pug">
div.root
  div.assignment
    div.grid
      div.row(v-for='row in grid')
        div.cell(v-for='cell in row'
          @drop.prevent='dropCell' @dragstart='dragCell(cell, $event)' @dragover.prevent='' draggable='true') {{cell}}
    div.control
      el-button(@click.prevent='shuffle' type='success' size='large') Shuffle
      el-button(@click.prevent='findSolution' type='primary' size='large' ) Find solution
</template>
<script>
import Vue from 'vue'
import { Button } from 'element-ui'

const directions = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
}

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
  computed: {
    emptyCellIndices () {
      return this.cellIndices(null)
    }
  },
  methods: {
    shuffle () {
      const moveCount = 150
      const moveBuffer = new Uint8Array(moveCount)
      window.crypto.getRandomValues(moveBuffer)
      const moves = moveBuffer.map(i => i % Object.keys(directions).length)

      moves.forEach(m => this.tryMoveEmptyCell(m))
    },
    dragCell (value, event) {
      const text = (value != null) ? value : ''
      event.dataTransfer.setData('text', text)
    },
    dropCell (event) {
      if (event.target.classList.contains('cell')) {
        const fromVal = event.dataTransfer.getData('text')
        const targetVal = event.target.textContent
        const swapWithEmptyCell = targetVal === '' || fromVal === ''
        if (swapWithEmptyCell) {
          const nonEmptyCellIndices = this.cellIndices(parseInt(targetVal || fromVal))
          this.tryMoveCell(nonEmptyCellIndices, this.emptyCellIndices)
        }
      }
    },
    tryMoveCell ([fromI, fromJ], [toI, toJ]) {
      const min = 0
      const max = this.grid.length - 1
      const noOverflow = toI >= min && toI <= max && toJ >= min && toJ <= max
      const manhattanDistance = Math.abs(fromI - toI) + Math.abs(fromJ - toJ)
      if (noOverflow && manhattanDistance === 1) {
        const tmp = this.grid[fromI][fromJ]
        Vue.set(this.grid[fromI], fromJ, this.grid[toI][toJ])
        Vue.set(this.grid[toI], toJ, tmp)
        return true
      }
      return false
    },
    tryMoveEmptyCell (direction) {
      const [fromI, fromJ] = this.emptyCellIndices
      let toI = fromI
      let toJ = fromJ
      switch (direction) {
        case directions.TOP: --toI; break
        case directions.BOTTOM: ++toI; break
        case directions.LEFT: --toJ; break
        case directions.RIGHT: ++toJ; break
        default: throw new Error(`Invalid direction: ${direction}`)
      }
      this.tryMoveCell([fromI, fromJ], [toI, toJ])
    },
    cellIndices (value) {
      for (let i = 0; i < this.grid.length; i++) {
        const j = this.grid[i].indexOf(value)
        if (j !== -1) {
          return [i, j]
        }
      }
    },
    cellIdToIndices (id) {
      const i = (id < this.grid.length)
        ? 0
        : (id < this.grid.length * 2) ? 1 : 2
      const j = id % this.grid.length
      return [i, j]
    },
    findSolution () {
      console.log('TODO')
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>
<style lang="stylus" scoped>
.root
  color #5e6d82
  font-size 3.6vmin
  display flex
  justify-content center
  align-items center

  > .assignment
    display flex
    flex-flow column
    justify-content space-evenly
    align-items center

    > .grid
      background #e6eefb
      border 0.8vmin solid #c3c3c3
      display flex
      flex-flow column
      justify-content space-evenly
      /*align-items center*/
      height 74.2vmin
      width 74.2vmin

      > .row
        display flex
        justify-content space-evenly
        align-items center

        > .cell
          border 0.8vmin solid #c3c3c3 /*#2b2b2b*/
          margin -0.8vmin
          display flex
          justify-content center
          align-items center
          width: 24.2vmin
          height 24.2vmin
          font-size: min(4em, 24.2vmin)

    > .control
      width 74.2vmin
      margin 1vmin
      display inline-flex
      justify-content space-evenly
      align-items center

      > button
        flex: 50%
        max-width 37vmin
        font-size max(1rem, 1.56em)
</style>
