import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Print from '@/pages/print/print'
import Share from '@/pages/share/share'
import ElList from '@/pages/elList/elList'

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
        },
        {
            path: '/share',
            name: 'Share',
            component: Share
        },
        {
            path: '/elList',
            name: 'ElList',
            component: ElList
        }
    ]
})
