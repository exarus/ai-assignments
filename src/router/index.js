import Vue from 'vue'
import Router from 'vue-router'
import GlobalNavigation from '@/components/GlobalNavigation'
import EightPuzzle from '@/components/EightPuzzle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GlobalNavigation',
      component: GlobalNavigation
    },
    {
      path: '/8-puzzle',
      name: 'EightPuzzle',
      component: EightPuzzle
    }
  ]
})
