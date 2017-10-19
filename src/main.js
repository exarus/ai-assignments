import Vue from 'vue'
import { Button, ButtonGroup, Dialog, Select, Option, Row, Col, Table, TableColumn, Loading } from 'element-ui'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
