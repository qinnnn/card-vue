import Vue from 'vue'
import Router from 'vue-router'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      components: require("@/view/home")
    },
    {
      path: '/login',
      name: 'login',
      components: require("@/view/login")
    },
    {
      path: '/home',
      name: 'home',
      components: require("@/view/home")
    },
    {
      path: '/cardBag',
      name: 'cardBag',
      components: require("@/view/cardBag")
    },
    {
      path: '/cardPumping',
      name: 'cardPumping',
      components: require("@/view/cardPumping")
    },
    {
      path: '/battlePVP',
      name: 'battlePVP',
      components: require("@/view/battlePVP")
    },
  ]
})

router.beforeEach((to, from, next) => {
  let token = Vue.cookie.get('token')
  if (!token || !/\S/.test(token)) {
    if(to.name ==='login'){
      next()
    }else{
      clearLoginInfo()
      next({name:'login'})
    }
  } else {
    next()
  }
})

export default router