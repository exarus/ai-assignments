<template lang="pug">
div(:class='stateClassObject')
</template>

<script>
import { cellStates } from '@/util/vacuum-cleaner-world'

export default {
  name: 'VacuumCleanerWorldCell',
  props: {
    state: Number
  },
  computed: {
    stateClassObject: ({ state }) => ({
      clean: state === cellStates.clean,
      dirty: state === cellStates.dirty,
      wall: state === cellStates.wall,
      vacuumCleaner: state === cellStates.vacuumCleaner
    })
  }
}
</script>

<style scoped>
.dirty {
  background: url('~@/assets/dirty.jpg');
}

.wall {
  background: url('~@/assets/wall.svg') center / contain no-repeat;
}

.vacuumCleaner {
  background: url('~@/assets/vacuum-cleaner.png') center / contain no-repeat;
}
</style>
