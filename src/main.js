import Vue from 'vue'
import mobileDragDropShim from 'drag-drop-webkit-mobile'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

mobileDragDropShim()

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
