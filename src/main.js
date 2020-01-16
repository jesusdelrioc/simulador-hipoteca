// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import vSelect from 'vue-select'
import Vuetify from 'vuetify'

require('../src/assets/style.css')
require('./assets/sass/main.scss')

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.component('v-select', vSelect)
Vue.filter('currency', (value) => {
  return value.toLocaleString('es-ES')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
