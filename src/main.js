import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'amfe-flexible' // 根据设备宽，计算出1rem对应的像素值（设备宽的十分之一）

import '@/common/scss/index.scss'

import '@/common/js/axios.config.js'
import '@/common/js/filters.js'

import 'jquery'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
