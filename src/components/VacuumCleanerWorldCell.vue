<template lang="pug">
div(:class='stateClassObject')
</template>

<script>
export default {
  name: 'VacuumCleanerWorldCell',
  props: {
    state: Object
  },
  computed: {
    stateClassObject: ({ state }) => ({
      clean: state.isClean,
      dirty: state.isDirty,
      wall: state.isWall,
      vacuumCleaner: state.hasVacuumCleaner
    })
  }
}
</script>

<style scoped>
.dirty {
  background: url('~@/assets/dirty.jpg') center / contain no-repeat;
}

.wall {
  background: url('~@/assets/wall.svg') center / contain no-repeat;
}

.vacuumCleaner {
  background: url('~@/assets/vacuum-cleaner.png') center / contain no-repeat;
}
</style>
