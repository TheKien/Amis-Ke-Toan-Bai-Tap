import Vue from 'vue'
import VueRouter from 'vue-router'
import Employee from './components/pages/employee.vue'
import Customer from './components/pages/customer.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/employee'},
        {path: '/employee', component: Employee},
        {path: '/customer', component: Customer},
    ]
})