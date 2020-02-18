import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { authentication } from './authentication'
// Vue.use(require('vue-moment'));

Vue.config.productionTip = false

Vue.filter('currency', (value: number): string => {
  return value.toString() + ' $'
})

Vue.filter('decode64Image', (value: string): string => {
  if (value) {
    return "data:image/jpeg;base64," + value;
  } else {
    return "";
  }
})

authentication.initialize().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
});