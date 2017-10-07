<template lang="pug">
.root
  .assignment
    .grid
      .row(v-for='row of grid')
        .cell(
          v-for='cell of row',
          :class='{ immovable: !isDraggable(cell) }',
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

<!--suppress JSPotentiallyInvalidTargetOfIndexedPropertyAccess, JSUnresolvedVariable -->
<script>
import { Button } from 'element-ui'
import {
  defaultGrid, emptyCellValue, emptyCellIndices, cellIndices, manhattanDistance, swapCells, shuffledGrid
} from '@/algorithms/8-puzzle/util'
import findSolution from '@/algorithms/8-puzzle/aStarSearch'

const gridStorageKey = 'grid'

export default {
  data () {
    return {
      grid: defaultGrid,
      draggedCell: 0
    }
  },
  created () {
    this.emptyCell = emptyCellValue
    const savedGrid = localStorage.getItem(gridStorageKey)
    if (savedGrid !== null) {
      this.grid = JSON.parse(savedGrid)
    }
  },
  computed: {
    emptyCellIndices () {
      return emptyCellIndices(this.grid)
    }
  },
  methods: {
    shuffle () {
      this.grid = shuffledGrid(33)
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
      const isEmptyDragged = this.draggedCell === this.emptyCellValue
      if (isEmptyDragged || targetCell === this.emptyCellValue) {
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
      this.saveGrid()
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
<style scoped>
.root {
  color: #5e6d82;
  font-size: 3.6vmin;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .assignment {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;

    & > .grid {
      background: #e6eefb;
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

    & > .control {
      width: 74.2vmin;
      margin: 1vmin;
      display: inline-flex;
      justify-content: space-evenly;
      align-items: center;

      & > button {
        flex: 50%;
        max-width: 37vmin;
        font-size: 1.33em;
      }
    }
  }
}
</style>
