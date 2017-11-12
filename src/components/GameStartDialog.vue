<template lang="pug">
ElDialog(title='Game Options', :width='dialogWidth()' center :visible.sync='visible')
  .choose-options Choose game options:
  ElSelect(v-model='selectedSize', placeholder='Select size')
    ElOption(v-for='size of sizeOptions', :key='size.key', :label='size.label', :value='size.key')
  ElSelect(v-model='selectedComplexity', placeholder='Select complexity')
    ElOption(v-for='complexity of complexityOptions', :key='complexity.key', :label='complexity.label', :value='complexity.key')
  span(slot='footer')
    ElButton(v-else @click='startNewGame' type='primary' size='large') Start Game
</template>

<script>
import toSelectOptions from '@/util/toSelectOptions'
import { gameComplexities, gameSizes } from '@/gamedev/EightPuzzleGame'

export default {
  name: 'GameStartDialog',
  props: ['visible'],
  data: () => ({
    selectedComplexity: 'Medium',
    complexityOptions: toSelectOptions(gameComplexities),
    selectedSize: 3,
    sizeOptions: toSelectOptions(gameSizes)
  }),
  methods: {
    startNewGame () {
      this.$emit('gameStarted', {
        complexity: this.selectedComplexity,
        size: this.selectedSize
      })
    },
    dialogWidth () {
      return window.innerWidth > 1130 ? '30%' : '339px'
    }
  }
}
</script>

<style scoped>
.choose-options {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
