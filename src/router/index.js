import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Print from '@/pages/print/print'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/print',
            name: 'Print',
            component: Print
        }
    ]
})
