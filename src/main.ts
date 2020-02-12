import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { default as Adal, AxiosAuthHttp } from 'vue-adal'
import VueAxios from 'vue-axios'

// const graphApiBase = `https://graph.windows.net`
// const graphApiResource = '86592948-26f1-48a2-b7fa-09b99e2aa63e'

Vue.use(Adal, {
  config: {
    // 'common' (multi-tenant gateway) or Azure AD Tenant ID
    tenant: '8f47ad71-44ca-48bf-afe3-56b9360a4495',

    // Application ID
    clientId: '9650376c-177d-4ef3-aad2-890bd0e89c41',

    // Host URI
    redirectUri: 'http://localhost:8080',

    cacheLocation: 'sessionStorage'
  },
  requireAuthOnInitialize: true,
  router: router
})

const instance = axios.create({
  baseURL: 'https://api.coindesk.com/',
  // headers: { 'Authorization': localStorage.getItem('adal.idtoken') }
});

instance.interceptors.response.use(undefined, function (err) {
  return new Promise(function (resolve, reject) {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
      console.log("DEBUG ERR 401")
      router.push('/');
      // you can also redirect to /login if needed !
    }
    throw err;
  });
});


Vue.use({
  install(vue, opts = {}) {
    // Configures an axios http client with a interceptor to auto-acquire tokens
    vue.prototype.$http = axios.create({
      baseURL: 'https://api.coindesk.com/',
      // headers: { 'Authorization': localStorage.getItem('adal.idtoken') }
    })
  }
})


// Vue.use(VueAxios, axios)


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
