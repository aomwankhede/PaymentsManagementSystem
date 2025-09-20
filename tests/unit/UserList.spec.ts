// tests/unit/UserList.spec.ts
import { mount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/views/UserList.vue'

// Mock store
const store = createStore({
  getters: {
    getUserList: () => [],
    getCurrUserDetails: () => ({ id: 'admin1', name: 'Admin', role: 'admin' }),
  },
}) as Store<any>

// Add a mocked dispatch function
store.dispatch = jest.fn()

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('UserList.vue - Structural Test', () => {
  it('renders main elements', async () => {
    const wrapper = mount(UserList, {
      global: {
        plugins: [store, router],
      },
    })

    // Header
    expect(wrapper.find('h1').exists()).toBe(true)

    // Table
    expect(wrapper.find('table').exists()).toBe(true)

    // Search input
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)

    // Filter select(s)
    expect(wrapper.find('select').exists()).toBe(true)

    // Add user button
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
