import Vue from 'vue'
import App from './App.vue'
//  导入bootstrap
import '../bootstrap-3.4.1-dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
