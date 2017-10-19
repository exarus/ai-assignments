import Vue from 'vue'
import Router from 'vue-router'
import VacuumCleanerWorld from '@/components/VacuumCleanerWorld'
import GlobalNavigation from '@/components/GlobalNavigation'
import EightPuzzleGame from '@/components/EightPuzzleGame'
import EightPuzzleSolver from '@/components/EightPuzzleSolver'
import WumpusWorld from '@/components/WumpusWorld'

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
      path: '/ai/wumpus-world',
      name: WumpusWorld.name,
      component: WumpusWorld
    }
  ]
})
