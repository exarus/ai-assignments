<template lang="pug">
.root
  .assignment
    .grid
      .row(v-for='row of grid')
        .cell(
          v-for='cell of row',
          :class='cellClassObject(cell)',
          :draggable='isDraggable(cell).toString()',
          @dragstart='dragCell(cell)',
          @dragover.prevent='',
          @dragenter.prevent='',
          @drop.prevent='dropCell(cell)'
        ) {{cell !== emptyCell ? cell : ''}}
    .control
      el-button(@click.prevent='shuffle' type='success' size='large') Shuffle
      el-button(@click.prevent='findSolution' type='primary' size='large' ) Find solution
</template>

<!--suppress JSPotentiallyInvalidTargetOfIndexedPropertyAccess -->
<script>
import { Button } from 'element-ui'
import clone from 'ramda/src/clone'
import { defaultGrid, emptyCell, cellIndices, manhattanDistance, swapCells } from '@/algorithms/8-puzzle/util'
import findSolution from '@/algorithms/8-puzzle/aStarSearch'

const directions = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
}
const gridStorageKey = 'grid'

export default {
  data () {
    return {
      grid: defaultGrid,
      draggedCell: 0
    }
  },
  created () {
    this.emptyCell = emptyCell
    const savedGrid = localStorage.getItem(gridStorageKey)
    if (savedGrid !== null) {
      this.grid = JSON.parse(savedGrid)
    }
  },
  computed: {
    emptyCellIndices () {
      return this.cellIndices(this.emptyCell)
    }
  },
  methods: {
    shuffle () {
      const moveCount = 12
      const moveBuffer = new Uint8Array(moveCount)
      window.crypto.getRandomValues(moveBuffer)

      const moves = moveBuffer.map(i => i % Object.keys(directions).length)
      this.grid = clone(defaultGrid)
      moves.forEach(m => this.moveEmptyCell(m))
      this.saveGrid()
    },
    findSolution () {
      const solution = findSolution(this.grid)
      console.log(solution)
    },
    dragCell (cell) {
      this.draggedCell = cell
    },
    dropCell (targetCell) {
      const isEmptyDragged = this.draggedCell === this.emptyCell
      if (isEmptyDragged || targetCell === this.emptyCell) {
        const nonEmptyCellIndices = this.cellIndices(isEmptyDragged ? targetCell : this.draggedCell)
        this.swapCells(nonEmptyCellIndices, this.emptyCellIndices)
        this.saveGrid()
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
    moveEmptyCell (direction) {
      let toX = this.emptyCellIndices[0]
      let toY = this.emptyCellIndices[1]
      switch (direction) {
        case directions.TOP: --toX; break
        case directions.BOTTOM: ++toX; break
        case directions.LEFT: --toY; break
        case directions.RIGHT: ++toY; break
        default: throw new Error(`Invalid direction: ${direction}`)
      }
      const max = this.grid.length - 1
      if (toX >= 0 && toX <= max && toY >= 0 && toY <= max) {
        this.swapCells(this.emptyCellIndices, [toX, toY])
      }
    },
    cellIndices (cell) {
      return cellIndices(this.grid, cell)
    },
    swapCells (c1, c2) {
      swapCells(this.grid, c1, c2)
      this.grid.splice(this.grid.length) // triggers rerender
    },
    saveGrid () {
      localStorage.setItem(gridStorageKey, JSON.stringify(this.grid))
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
