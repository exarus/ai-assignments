import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import EightPuzzle from '@/components/EightPuzzle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/8-puzzle',
      name: 'EightPuzzle',
      component: EightPuzzle
    }
  ]
})
