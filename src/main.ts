import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { default as Adal, AuthenticationContext } from 'vue-adal'
import VueAxios from 'vue-axios'

import { authentication } from './authentication'
const baseURL: string = 'https://awproject.azurewebsites.net/v1/';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    // 'Authorization': localStorage.getItem('adal.idtoken')
  },
});

Vue.use({
  install(vue, opts = {}) {
    vue.prototype.$http = axiosInstance
  }
})

Vue.config.productionTip = false

Vue.filter('currency', function (value: number): string {
  return value.toString() + ' $'
})
authentication.initialize().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
});