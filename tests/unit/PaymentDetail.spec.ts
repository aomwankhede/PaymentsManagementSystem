// tests/unit/PaymentDetail.spec.ts
import { mount } from '@vue/test-utils'
import PaymentDetail from '@/views/PaymentDetail.vue'
import { createStore, Store } from 'vuex'

// Mock store
const store = createStore({
  getters: {
    getPaymentList: () => [
      {
        id: 'p1',
        userId: 'u1',
        amount: 100,
        status: 'completed',
        category: 'loan',
        date: '2025-01-01',
        createdOrUpdatedBy: 'admin',
      },
    ],
    getUserList: () => [
      { id: 'u1', name: 'Alice', email: 'alice@test.com', role: 'user', status: 'active' },
    ],
    getCurrUserDetails: () => ({ id: 'admin1', name: 'Admin', role: 'admin' }),
  },
}) as Store<any>

store.dispatch = jest.fn()

jest.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 'p1' } }),
  useRouter: () => ({ push: jest.fn() }),
}))

describe('PaymentDetail.vue - Structural Test', () => {
  it('renders main elements', async () => {
    const wrapper = mount(PaymentDetail, {
      global: {
        plugins: [store],
      },
    })

    // This is the only permanent component other components have v-show="condition" directive
    expect(wrapper.find('h1').exists()).toBe(true)
  })
})
