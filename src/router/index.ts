import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import { authentication } from '@/authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Products,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    alias: '/b',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    meta: {
      requiresAuthentication: true
    }
  }, {
    path: '/products*',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue'),
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/*',
    name: 'not-found',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // this route requires auth, check if logged in
    if (authentication.isAuthenticated()) {
      // only proceed if authenticated.
      next();
    } else {
      authentication.signIn();
    }
  } else {
    next();
  }
});

export default router
