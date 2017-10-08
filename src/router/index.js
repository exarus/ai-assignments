import Vue from 'vue'
import Router from 'vue-router'
import GlobalNavigation from '@/components/GlobalNavigation'
import EightPuzzleGame from '@/components/EightPuzzleGame'
import EightPuzzleSolver from '@/components/EightPuzzleSolver'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GlobalNavigation',
      component: GlobalNavigation
    },
    {
      path: '/game-dev/8-puzzle',
      name: 'EightPuzzleGame',
      component: EightPuzzleGame
    },
    {
      path: '/ai/8-puzzle',
      name: 'EightPuzzleSolver',
      component: EightPuzzleSolver
    }
  ]
})
