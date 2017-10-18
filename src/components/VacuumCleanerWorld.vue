<template lang="pug">
.root
  router-link(to='/')
    i.el-icon-caret-left
  .grid-container
    .grid
      VacuumCleanerWorldCell(v-for='(cell, index) of cells', :key='index', :state='cell')
    .control
      ElButton(@click='nextStep' type='primary' size='large' round) Next Step
  router-link(to='/ai/8-puzzle')
  i.el-icon-caret-right
</template>

<script>
import flatten from 'ramda/src/flatten'
import SimpleReflexAgent from '@/ai/vacuum-cleaner-world/SimpleReflexAgent'
// import ModelBasedReflexAgent from '@/ai/vacuum-cleaner-world/ModelBasedReflexAgent'
import Environment from '@/ai/vacuum-cleaner-world/Environment'
import VacuumCleanerWorld from '@/ai/vacuum-cleaner-world/VacuumCleanerWorld'
import VacuumCleanerWorldCell from './VacuumCleanerWorldCell'

const world = new VacuumCleanerWorld(Environment(), SimpleReflexAgent())

export default {
  name: 'VacuumCleanerWorld',
  components: { VacuumCleanerWorldCell },
  data: () => ({
    world: {
      environment: {},
      agent: {
        grid: []
      }
    }
  }),
  created () {
    this.world = world
  },
  computed: {
    cells: ({ world }) => flatten(world.environment.grid)
  },
  methods: {
    nextStep () {
      this.world.performNextAction()
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
