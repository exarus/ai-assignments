<script>
import clone from 'ramda/src/clone'
import { defaultGrid, emptyCellValue as emptyCell, emptyCellIndices, cellIndices, manhattanDistance } from '@/util/8-puzzle'

// const gridStorageKey = 'grid'

export default {
  name: 'EightPuzzle',
  props: {
    grid: {
      type: Array,
      default: defaultGrid
    }
  },
  data () {
    // let grid
    // if (this.initialGrid != null) {
    //   grid = clone(this.initialGrid)
    // } else {
    //   const savedGrid = localStorage.getItem(gridStorageKey)
    //   grid = savedGrid !== null ? JSON.parse(savedGrid) : defaultGrid
    //   this.$emit('update:initialGrid', grid)
    // }

    return {
      draggedCell: 0
    }
  },

  computed: {
    emptyCellIndices () {
      return emptyCellIndices(this.grid)
    }
  },

  methods: {
    dragCell (cell) {
      this.draggedCell = cell
    },
    dropCell (targetCell) {
      const isEmptyDragged = this.draggedCell === emptyCell
      if (isEmptyDragged || targetCell === emptyCell) {
        const nonEmptyCellIndices = this.cellIndices(isEmptyDragged ? targetCell : this.draggedCell)
        this.swapCells(nonEmptyCellIndices, this.emptyCellIndices)
      }
      this.draggedCell = 0
    },
    isDraggable (cell) {
      const distance = manhattanDistance(this.cellIndices(cell), this.emptyCellIndices)
      return distance === 1
    },
    cellIndices (cell) {
      return cellIndices(this.grid, cell)
    },
    swapCells ([x1, y1], [x2, y2]) {
      const grid = clone(this.grid)
      const tmp = grid[x1][y1]
      grid[x1][y1] = grid[x2][y2]
      grid[x2][y2] = tmp

      // localStorage.setItem(gridStorageKey, JSON.stringify(grid))
      this.$emit('update:initialGrid', grid)
    }
  }
}
</script>

<template lang="pug">
  .grid
    .row(v-for='row of grid')
      .cell(
        v-for='cell of row',
        :key='cell',
        :class='{ immovable: !isDraggable(cell) }',
        :draggable='isDraggable(cell).toString()',
        @dragstart='dragCell(cell)',
        @dragover.prevent='',
        @dragenter.prevent='',
        @drop.prevent='dropCell(cell)'
      ) {{cell !== emptyCell ? cell : ''}}
</template>

<style scoped lang="postcss">
.grid {
  background: #e6eefb;
  font-size: 3.6vmin;
  border: 0.8vmin solid #c3c3c3;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;

  /* align-items: center; */
  height: 74.2vmin;
  width: 74.2vmin;

  & > .row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & > .cell {
      border: 0.8vmin solid #c3c3c3;
      margin: -0.8vmin;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24.2vmin;
      height: 24.2vmin;
      font-size: 4em;

      &.immovable {
        user-select: none;
      }
    }
  }
}
</style>
