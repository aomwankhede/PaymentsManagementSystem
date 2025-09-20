import { createStore, Store } from 'vuex'
import { mount } from '@vue/test-utils'
import PaymentList from '@/views/PaymentList.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Mock store
const store = createStore({
  getters: {
    getPaymentList: () => [],
    getUserList: () => [],
    getCurrUserDetails: () => ({ id: 'admin1', name: 'Admin', role: 'admin' }),
  },
}) as Store<any>

// Mock dispatch function on the store instance
store.dispatch = jest.fn()

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('PaymentList.vue - Structural Test', () => {
  it('renders main elements', async () => {
    const wrapper = mount(PaymentList, {
      global: {
        plugins: [store, router],
      },
    })

    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })
})
