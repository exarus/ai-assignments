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

<!--suppress JSPotentiallyInvalidTargetOfIndexedPropertyAccess, JSUnresolvedVariable -->
<script>
import clone from 'ramda/src/clone'
import equals from 'ramda/src/equals'
import { defaultGrid, emptyCellValue, emptyCellIndices, cellIndices, manhattanDistance, swapCells } from '@/util/8-puzzle'

const gridStorageKey = 'grid'

export default {
  name: 'EightPuzzle',
  props: {
    initialGrid: Array
  },
  data () {
    let grid
    if (this.initialGrid != null) {
      grid = clone(this.initialGrid)
    } else {
      const savedGrid = localStorage.getItem(gridStorageKey)
      grid = savedGrid !== null
        ? JSON.parse(savedGrid)
        : defaultGrid
    }
    return {
      grid,
      draggedCell: 0
    }
  },
  created () {
    this.emptyCell = emptyCellValue
  },
  computed: {
    emptyCellIndices () {
      return emptyCellIndices(this.grid)
    }
  },
  watch: {
    initialGrid (newGrid) {
      this.grid = clone(newGrid)
    },
    grid (newGrid) {
      if (equals(newGrid, defaultGrid)) {
        this.$emit('ordered')
      }
      localStorage.setItem(gridStorageKey, JSON.stringify(newGrid))
    }
  },
  methods: {
    dragCell (cell) {
      this.draggedCell = cell
    },
    dropCell (targetCell) {
      const isEmptyDragged = this.draggedCell === this.emptyCell
      if (isEmptyDragged || targetCell === this.emptyCell) {
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
    swapCells (c1, c2) {
      swapCells(this.grid, c1, c2)
      this.grid.splice(this.grid.length) // triggers rerender
    }
  }
}
</script>
<style scoped>
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
