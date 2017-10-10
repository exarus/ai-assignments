import Vue from 'vue'
import { Button, Dialog, Select, Option, Row, Col } from 'element-ui'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(Row)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
