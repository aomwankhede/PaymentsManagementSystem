// tests/unit/PaymentFormStructure.spec.ts
import { mount } from '@vue/test-utils'
import PaymentForm from '@/views/PaymentForm.vue'
import { createStore, Store } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'


jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}))

describe('PaymentForm.vue structure', () => {
  let store: Store<any>
  let router: any

  beforeEach(() => {
    store = createStore({
      getters: {
        getUserList: () => [
          { id: 'u1', name: 'Alice', email: 'alice@test.com', role: 'user', status: 'active' },
        ],
        getPaymentList: () => [],
      },
    }) as unknown as Store<any>

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    })
  })

  const factory = () =>
    mount(PaymentForm, {
      global: {
        plugins: [store, router],
        mocks: {
          $route: { params: {} },
        },
      },
    })

  it('renders the form title', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Create Payment')
  })

  it('renders all form fields', () => {
    const wrapper = factory()
    // User dropdown
    expect(wrapper.find('select').exists()).toBe(true)
    // Amount input
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    // Date input
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    // Status select
    expect(wrapper.findAll('select').length).toBeGreaterThanOrEqual(2)
    // Category select
    expect(wrapper.findAll('select').length).toBeGreaterThanOrEqual(3)
  })

  it('renders action buttons', () => {
    const wrapper = factory()
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    expect(buttons[0].text()).toBe('Cancel')
    expect(buttons[1].text()).toBe('Create Payment')
  })
})
