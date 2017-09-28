<template lang="pug">
.root
  .assignment
    .grid
      .row(v-for='row in grid')
        .cell(
          v-for='cell in row'
          :class='cellClassObject(cell)'
          :draggable='isDraggable(cell).toString()'
          @dragstart='dragCell(cell)'
          @dragover.prevent=''
          @drop.prevent='dropCell(cell)'
        ) {{cell !== emptyCell ? cell : ''}}
    .control
      el-button(@click.prevent='shuffle' type='success' size='large') Shuffle
      el-button(@click.prevent='findSolution' type='primary' size='large' ) Find solution
</template>
<script>
import Vue from 'vue'
import _last from 'lodash-es/last'
import { Button } from 'element-ui'
import { manhattanDistance } from '@/algorithms/8-puzzle-solution'

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
        [7, 8, 9]
      ],
      draggedCell: 0
    }
  },
  created () {
    this.emptyCell = _last(_last(this.grid))
  },
  computed: {
    emptyCellIndices () {
      return this.cellIndices(this.emptyCell)
    }
  },
  methods: {
    shuffle () {
      const moveCount = 150
      const moveBuffer = new Uint8Array(moveCount)
      crypto.getRandomValues(moveBuffer)
      const moves = moveBuffer.map(i => i % Object.keys(directions).length)

      moves.forEach(m => this.tryMoveEmptyCell(m))
    },
    findSolution () {
      console.log('TODO')
    },
    dragCell (cell) {
      this.draggedCell = cell
    },
    dropCell (targetCell) {
      const isEmptyDragged = this.draggedCell === this.emptyCell
      if (isEmptyDragged || targetCell === this.emptyCell) {
        const nonEmptyCellIndices = this.cellIndices(isEmptyDragged ? targetCell : this.draggedCell)
        const moved = this.tryMoveCell(nonEmptyCellIndices, this.emptyCellIndices)
        if (!moved) {
          console.log('Bad move')
        }
      }
      this.draggedCell = 0
    },
    isDraggable (cell) {
      const distance = manhattanDistance(this.cellIndices(cell), this.emptyCellIndices)
      return distance === 1
    },
    cellClassObject (cell) {
      return {
        'non-selectable': !this.isDraggable(cell)
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
    cellIndices (cell) {
      for (let i = 0; i < this.grid.length; i++) {
        const j = this.grid[i].indexOf(cell)
        if (j !== -1) {
          return [i, j]
        }
      }
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

          &.non-selectable
            user-select none

    > .control
      width 74.2vmin
      margin 1vmin
      display inline-flex
      justify-content space-evenly
      align-items center

      > button
        flex: 50%
        max-width 37vmin
        font-size max(1rem, 1.33em)
</style>
