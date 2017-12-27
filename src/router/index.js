import Vue from 'vue'
import Router from 'vue-router'
import GlobalNavigation from '@/components/GlobalNavigation'
import VacuumCleanerWorld from '@/components/VacuumCleanerWorld'
import EightPuzzleSolver from '@/components/EightPuzzleSolver'
import EightPuzzleGame from '@/components/EightPuzzleGame/EightPuzzleGame'
import FuzzyClusteringSolver from '@/components/FuzzyClusteringSolver/FuzzyClusteringSolver'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: GlobalNavigation.name,
      component: GlobalNavigation
    },
    {
      path: '/game-dev/8-puzzle',
      name: EightPuzzleGame.name,
      component: EightPuzzleGame
    },
    {
      path: '/ai/8-puzzle',
      name: EightPuzzleSolver.name,
      component: EightPuzzleSolver
    },
    {
      path: '/ai/vacuum-cleaner-world',
      name: VacuumCleanerWorld.name,
      component: VacuumCleanerWorld
    },
    {
      path: '/ml/fcm',
      name: FuzzyClusteringSolver.name,
      component: FuzzyClusteringSolver
    }
  ]
})
