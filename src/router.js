import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/Create'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/create',
      component: Create,
    }
  ]
})

export default router