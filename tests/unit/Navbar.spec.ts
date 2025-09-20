import { mount } from '@vue/test-utils'
import Navbar from '@/components/NavbarComponent.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'


//Mock router with all the routes otherwise the warning comes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Dashboard</div>' } },
    { path: '/users', component: { template: '<div>Users</div>' } },
    { path: '/users/new', component: { template: '<div>Users</div>' } },
    { path: '/payments', component: { template: '<div>Payments</div>' } },
  ],
})

function makeStore(currUser: any = null) {
  return createStore({
    state: { currUserDetails: currUser },
    getters: {
      getCurrUserDetails: (state) => state.currUserDetails,
    },
    mutations: {
      setCurrUserDetails(state, payload) {
        state.currUserDetails = payload
      },
    },
  })
}

describe('NavbarComponent.vue', () => {
  beforeAll(async () => {
    router.push('/')
    await router.isReady()
  })

  it('renders Login/Register when no user is logged in', () => {
    const store = makeStore(null)
    const wrapper = mount(Navbar, {
      global: { plugins: [store, router] },
    })

    expect(wrapper.text()).toContain('Login / Register')
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders user info when logged in', () => {
    const store = makeStore({ name: 'Alice' })
    const wrapper = mount(Navbar, {
      global: { plugins: [store, router] },
    })

    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.find('button').text()).toBe('Logout')
  })

  it('logs out user when logout button is clicked', async () => {
    const store = makeStore({ name: 'Bob' })
    const wrapper = mount(Navbar, {
      global: { plugins: [store, router] },
    })

    const logoutBtn = wrapper.find('button')
    expect(logoutBtn.exists()).toBe(true)

    await logoutBtn.trigger('click')

    expect(store.state.currUserDetails).toBeNull()

    expect(router.currentRoute.value.fullPath).toBe('/')
  })
})
