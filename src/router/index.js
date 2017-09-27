import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EightPuzzle from '@/components/EightPuzzle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/8-puzzle',
      name: 'EightPuzzle',
      component: EightPuzzle
    }
  ]
})
