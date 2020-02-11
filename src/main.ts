import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
axios.defaults.baseURL = 'https://api.coindesk.com/'
axios.defaults.timeout = 1000

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.filter('currency', function (value: number): string {
  if (!value) return ''

  return value.toString() + ' $'
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
