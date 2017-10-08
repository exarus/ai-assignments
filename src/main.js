import Vue from 'vue'
import { Button, Dialog } from 'element-ui'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Dialog)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
