import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeeList from './components/pages/employee/EmployeeList.vue'
import CustomerList from './components/pages/customer/CustomerList.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/employee'},
        {path: '/employee', component: EmployeeList},
        {path: '/customer', component: CustomerList},
    ]
})