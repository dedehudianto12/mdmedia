import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../components/registerForm.vue')
  },
  {
    path: '/otp',
    name: 'Otp',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('access_token')
      if (valid) {
        next()
      } else {
        next({
          name: 'Home'
        })
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('access_token')
      const code = localStorage.getItem('code')
      if (valid && code) {
        next()
      } else {
        next({
          name: 'Home'
        })
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
