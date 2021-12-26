import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import vSelect from 'vue-select'
import Vuelidate from 'vuelidate'
import VueContentPlaceholders from 'vue-content-placeholders'
import VueMask from 'v-mask'

export const eventBus = new Vue()
Vue.config.productionTip = false
/* Thư viện combobox */
Vue.component('v-select', vSelect)
/* Thư viện validate */
Vue.use(Vuelidate)
/*  */
Vue.use(VueContentPlaceholders)
/* Thư viện format input */
Vue.use(VueMask);

new Vue({
  router,
  vSelect,
  render: h => h(App),
}).$mount('#app')
