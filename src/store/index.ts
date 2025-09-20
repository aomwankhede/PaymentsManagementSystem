import { createStore } from 'vuex'
import Payment from '@/interfaces/Payment'
import User from '@/interfaces/User'
import State from '@/interfaces/State'

// Helpers for persistence
function loadFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e)
    return fallback
  }
}

function saveToLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e)
  }
}

// Vuex Store
export default createStore<State>({
  state: {
    userList: loadFromLocalStorage<User[]>('userList', []),
    currUserDetails: loadFromLocalStorage<User | null>('currUserDetails', null),
    paymentList : loadFromLocalStorage<Payment[]>('paymentList',[])
  },

  getters: {
    getUserList: (state) => state.userList,
    getCurrUserDetails: (state) => state.currUserDetails,
    getPaymentList: (state) => state.paymentList
  },

  mutations: {
    setUserList(state, users: User[]) {
      state.userList = users
      saveToLocalStorage('userList', users)
    },
    setPaymentList(state, payments: Payment[]) {
      state.paymentList = payments
      saveToLocalStorage('paymentList', payments)
    },
    addUser(state, user: User) {
      state.userList.push(user)
      saveToLocalStorage('userList', state.userList)
    },
    addPayment(state, payment: Payment) {
      state.paymentList.push({...payment,createdOrUpdatedBy:state.currUserDetails?.id})
      console.log({...payment,createdOrUpdatedBy:state.currUserDetails?.id})
      saveToLocalStorage('paymentList', state.paymentList)
    },
    updateUser(state, updatedUser: User) {
      state.userList = state.userList.map((u) =>
        u.id === updatedUser.id ? { ...u, ...updatedUser} : u
      )
      saveToLocalStorage('userList', state.userList)
    },
    updatePayment(state, updatedPayment: Payment) {
      state.paymentList = state.paymentList.map((u) =>
        u.id === updatedPayment.id ? { ...u, ...updatedPayment,createdOrUpdatedBy:state.currUserDetails?.id } : u
      )
      saveToLocalStorage('paymentList', state.paymentList)
    },
    deleteUser(state,id:string){
      state.userList = state.userList.filter(user => user.id!=id)
      saveToLocalStorage('userList',state.userList)
    },
    deletePayment(state,id:string){
      state.paymentList = state.paymentList.filter(payment => payment.id!=id)
      saveToLocalStorage('paymentList',state.paymentList)
    },
    setCurrUserDetails(state, user: User | null) {
      state.currUserDetails = user
      saveToLocalStorage('currUserDetails', user)
    },
    clearCurrUser(state) {
      state.currUserDetails = null
      saveToLocalStorage('currUserDetails', null)
    },
  },

  actions: {
    createUser({ commit }, user: User) {
      commit('addUser', user)
    },
    editUser({ commit }, user: User) {
      commit('updateUser', user)
    },
    deleteUser({ commit }, id: string) {
      commit('deleteUser', id)
    },
    setCurrUserDetails({ commit }, user: User) {
      commit('setCurrUserDetails', user)
    },
    logout({ commit }) {
      commit('clearCurrUser')
    },
    createPayment({ commit }, payment: Payment) {
      commit('addPayment', payment)
    },
    editPayment({ commit }, payment: Payment) {
      commit('updatePayment', payment)
    },
    deletePayment({ commit }, id: string) {
      commit('deletePayment', id)
    },
  },
})
