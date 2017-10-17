<template lang="pug">
.root
  router-link(to='/')
    i.el-icon-caret-left
  .grid-container
    .grid
      template(v-for='row of grid')
        VacuumCleanerWorldCell.cell(v-for='cell of row', :state='cell')
    .control
      ElButton(@click='nextStep' type='primary' size='large' round) Next Step
  router-link(to='/ai/8-puzzle')
  i.el-icon-caret-right
</template>

<script>
import VacuumCleanerWorldCell from './VacuumCleanerWorldCell'
import { cellStates } from '@/util/vacuum-cleaner-world'

const defaultGrid = `
██████████
█        █
█ ██████ █
█ █      █
█ █    █ █
█ █  @ █ █
█ █    █ █
█ ██ ███ █
█        █
██████████
`.trim().split('\n').map(line =>
    [...line].map(c => ({
      ' ': cellStates.clean,
      '█': cellStates.wall,
      '@': cellStates.vacuumCleaner
    }[c]))
  )

export default {
  name: 'VacuumCleanerWorld',
  components: { VacuumCleanerWorldCell },
  data: () => ({
    grid: defaultGrid
  }),
  methods: {
    nextStep () {
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  font-size: 1rem;
}

.grid-container {
  flex-basis: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;

  & .control {
    width: 74vmin;
    margin: 10px;

    & button {
      font-size: 1.5em;
    }
  }
}

.grid {
  background: #e6eefb;
  font-size: 3.6vmin;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  justify-content: center;
  height: 74vmin;
  width: 74vmin;
}
</style>
