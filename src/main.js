import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import vSelect from 'vue-select'
import Vuelidate from 'vuelidate'

export const eventBus = new Vue()
Vue.config.productionTip = false
Vue.component('v-select', vSelect)
Vue.use(Vuelidate)

new Vue({
  router,
  vSelect,
  render: h => h(App),
}).$mount('#app')
