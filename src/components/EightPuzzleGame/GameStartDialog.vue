<script>
import toSelectOptions from '@/util/toSelectOptions'
import Game, { gameComplexities, gameSizes } from './Game'

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
      this.$emit('gameStarted', new Game({
        complexity: this.selectedComplexity,
        size: this.selectedSize
      }))
    },
    dialogWidth () {
      return window.innerWidth > 1130 ? '30%' : '339px'
    }
  }
}
</script>

<template lang="pug">
ElDialog(title='Game Options', :width='dialogWidth()' center :visible.sync='visible')
  span.dialog-body
    span.choose-options Choose game options:
    span Game Size:
    ElSelect.select(
      v-model='selectedSize',
      placeholder='Select size'
    )
      ElOption(
        v-for='size of sizeOptions',
        :key='size.key',
        :label='size.label',
        :value='size.key'
      )
    span Game Complexity:
    ElSelect.select(
      v-model='selectedComplexity',
      placeholder='Select complexity'
    )
      ElOption(
        v-for='complexity of complexityOptions',
        :key='complexity.key',
        :label='complexity.label',
        :value='complexity.key'
      )
  span(slot='footer')
    ElButton(@click='startNewGame' type='primary' size='large') Start Game
</template>

<style scoped lang="postcss">
.dialog-body {
  display: inline-grid;

  & .choose-options {
    grid-row: 1 / span 2;
  }
}
</style>
