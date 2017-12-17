<script>
import toSelectOptions from '@/util/toSelectOptions'
import flatten from 'ramda/src/flatten'
import SimpleReflexAgent from '@/ai/vacuum-cleaner-world/SimpleReflexAgent'
import ModelBasedReflexAgent from '@/ai/vacuum-cleaner-world/ModelBasedReflexAgent'
import Environment from '@/ai/vacuum-cleaner-world/Environment'
import VacuumCleanerWorld from '@/ai/vacuum-cleaner-world/VacuumCleanerWorld'
import VacuumCleanerWorldCell from './VacuumCleanerWorldCell'

const agentOptions = new Map([
  ['modelBased', { label: 'Model-based agent', factoryMethod: ModelBasedReflexAgent }],
  ['simple', { label: 'Simple reflex agent', factoryMethod: SimpleReflexAgent }]
])

const initialDirtAppearanceProbability = 0.01
const initialAgentKey = agentOptions.keys().next().value

const createWorld = (dirtAppearanceProbability, agentKey) => VacuumCleanerWorld(
  Environment({ dirtAppearanceProbability }),
  agentOptions.get(agentKey).factoryMethod()
)

export default {
  name: 'VacuumCleanerWorld',
  components: { VacuumCleanerWorldCell },
  data: () => ({
    world: createWorld(initialDirtAppearanceProbability, initialAgentKey),
    lastAction: '',
    worldAgent: initialAgentKey,
    selectedAgent: initialAgentKey,
    worldDirtAppearanceProbability: initialDirtAppearanceProbability,
    selectedDirtAppearanceProbability: initialDirtAppearanceProbability
  }),
  computed: {
    cells: ({ world }) => flatten(world.environment.grid),
    worldShouldBeRecreated: ({ worldAgent, selectedAgent }) => worldAgent !== selectedAgent
  },
  created () {
    this.agentOptions = toSelectOptions(agentOptions)
  },
  methods: {
    recreateWorld () {
      this.world = createWorld(this.selectedDirtAppearanceProbability, this.selectedAgent)
      this.worldAgent = this.selectedAgent
      this.worldDirtAppearanceProbability = this.selectedDirtAppearanceProbability
    },
    nextStep () {
      this.world.performNextAction()
    }
  }
}
</script>

<template lang="pug">
  .root
    router-link(to='/')
      i.el-icon-caret-left
    .grid-container
      .grid
        VacuumCleanerWorldCell(v-for='(cell, index) of cells', :key='index', :state='cell')
      .control
        ElButton(type='primary' size='large' round :disabled='worldShouldBeRecreated', @click='nextStep') Next Step
        ElSelect(v-model='selectedAgent' size='large')
          ElOption(
          v-for='a of agentOptions',
          :key='a.key',
          :label='a.label',
          :value='a.key'
          )
        ElButton(type='warning' size='large' round, @click='recreateWorld') Recreate World
    router-link(to='/ai/8-puzzle')
      i.el-icon-caret-right
</template>

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
    display: flex;
    justify-content: center;

    & > * {
      margin: 10px 5px;
    }
  }
}

.grid {
  background: #e6eefb;
  font-size: 3.6vmin;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 1px;
  justify-content: center;
  height: 74vmin;
  width: 74vmin;
}
</style>
