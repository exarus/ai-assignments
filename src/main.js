import Vue from 'vue'
import { Button, ButtonGroup, Col, Dialog, Option, Row, Select, Table, TableColumn } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// configure language
locale.use(lang)

// import components
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
