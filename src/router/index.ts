import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
    meta: {
      // requiresAuth: true
      guest: true

    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/secret',
    name: 'secret',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requireAuth: true
    }
  }

  , {
    path: '/product/:id',
    name: 'product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    meta: {
      // requiresAuth: true
      guest: true
    }
  }, {
    path: '/product*',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue'),
    meta: {
      // requiresAuth: true
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
    } else {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
