import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


import UserList from '@/views/UserList.vue'
import UserForm from '@/views/UserForm.vue'
import PaymentList from '@/views/PaymentList.vue'
import PaymentDetail from '@/views/PaymentDetail.vue'
import PaymentForm from '@/views/PaymentForm.vue'
import HomeComponent from '@/views/HomeComponent.vue'

import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name : 'Dashboard',
    component:HomeComponent
  },
  {
    path: '/users',
    name: 'UserList',
    meta: { requiresAuth: true },
    component: UserList,
  },
  {
    path: '/users/new',
    name: 'UserForm',
    component: UserForm,
  },
  {
    path: '/users/:id',
    name: 'UserEdit',
    meta: { requiresAuth: true },
    component: UserForm,
    props: true,
  },
  {
    path: '/payments',
    name: 'PaymentList',
    meta: { requiresAuth: true },
    component: PaymentList,
  },
  {
    path: '/payments/new',
    name: 'PaymentForm',
    meta: { requiresAuth: true },
    component: PaymentForm,
  },
  {
    path: '/payments/new/:id',
    name: 'PaymentEdit',
    meta: { requiresAuth: true },
    component: PaymentForm,
  },
  {
    path: '/payments/:id',
    name: 'PaymentDetail',
    meta: { requiresAuth: true },
    component: PaymentDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.getCurrUserDetails || localStorage.getItem('currUserDetails')

  if (to.meta.requiresAuth && !isLoggedIn) {
    alert("Pls login to continue")
    next('/users/new')
  } else {
    next()
  }
})


export default router
