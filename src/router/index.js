import Vue from 'vue'
import Router from 'vue-router'
import Calculadora from '@/components/Calculadora'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Calculadora',
      component: Calculadora
    }
  ]
})
