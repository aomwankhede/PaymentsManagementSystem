<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl">All Payments</h1>
      <button
        @click="goToNewPayment"
        class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
         v-show="store.getters.getCurrUserDetails?.role=='admin' || store.getters.getCurrUserDetails?.role=='manager'"
      >
        <Plus class="h-4 w-4 mr-2" />
        Add Payment
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search payments..."
          class="pl-10 w-full border rounded p-2"
        />
      </div>

      <!-- Status Filter -->
      <select v-model="statusFilter" class="w-full border rounded p-2">
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>

      <!-- Category Filter -->
      <select v-model="categoryFilter" class="w-full border rounded p-2">
        <option value="all">All Categories</option>
        <option value="loan">Loan</option>
        <option value="subscription">Subscription</option>
        <option value="transfer">Transfer</option>
      </select>

      <button
        @click="clearFilters"
        class="border px-4 py-2 rounded hover:bg-gray-100"
      >
        Clear Filters
      </button>
    </div>

    <!-- Payments Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left">Payment ID</th>
            <th class="px-4 py-2 text-left">User</th>
            <th class="px-4 py-2 text-left">Amount</th>
            <th class="px-4 py-2 text-left">Status</th>
            <th class="px-4 py-2 text-left">Category</th>
            <th class="px-4 py-2 text-left">Date</th>
            <th class="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in filteredPayments"
            :key="payment.id"
            class="border-t"
          >
            <td class="px-4 py-2 font-mono">{{ payment.id }}</td>
            <td class="px-4 py-2">{{ store.getters.getUserList.filter((user:User)=> user.id == payment.userId)[0]?.name }}</td>
            <td class="px-4 py-2 font-medium">${{ payment.amount }}</td>
            <td class="px-4 py-2">
              <span
                class="px-2 py-1 rounded text-xs font-semibold"
                :class="getStatusColor(payment.status)"
              >
                {{ payment.status }}
              </span>
            </td>
            <td class="px-4 py-2">
              <span
                class="px-2 py-1 rounded text-xs font-semibold"
                :class="getCategoryColor(payment.category)"
              >
                {{ payment.category }}
              </span>
            </td>
            <td class="px-4 py-2">{{ formatDate(payment.date) }}</td>
            <td class="px-4 py-2 text-right space-x-2">
              <button
                @click="goToDetail(payment.id)"
                class="p-2 border rounded hover:bg-gray-100"
              >
                <Eye class="h-4 w-4" />
              </button>
              <button
                @click="goToEdit(payment.id)"
                class="p-2 border rounded hover:bg-gray-100"
                 v-show="store.getters.getCurrUserDetails?.role=='admin' || store.getters.getCurrUserDetails?.role=='manager'"
              >
                <Edit class="h-4 w-4" />
              </button>
              <button
                @click="deletePayment(payment.id)"
                class="p-2 border rounded text-red-600 hover:bg-red-50"
                v-show="store.getters.getCurrUserDetails?.role=='admin' || store.getters.getCurrUserDetails?.role=='manager'"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div v-if="filteredPayments.length === 0" class="text-center py-8 text-gray-500">
        No payments found matching your criteria.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-vue-next'
import store from '@/store'

const router = useRouter()

interface Payment {
  id: string
  userId: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  category: string
  date: string
  createdOrUpdatedBy : string | undefined
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
  lastLogin?: string
}

// Mock payments data
const payments = computed<Payment[]>(()=>{
  return store.getters.getPaymentList
})

const searchTerm = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')

// Filter logic
const filteredPayments = computed(() =>
  payments.value.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      p.userId.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus =
      statusFilter.value === 'all' || p.status === statusFilter.value
    const matchesCategory =
      categoryFilter.value === 'all' || p.category === categoryFilter.value
    return matchesSearch && matchesStatus && matchesCategory
  })
)

function deletePayment(id: string) {
  store.dispatch('deletePayment',id)
}

function clearFilters() {
  searchTerm.value = ''
  statusFilter.value = 'all'
  categoryFilter.value = 'all'
}

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'loan':
      return 'bg-blue-100 text-blue-800'
    case 'subscription':
      return 'bg-purple-100 text-purple-800'
    case 'transfer':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Navigation handlers
function goToNewPayment() {
  router.push('/payments/new')
}
function goToDetail(id: string) {
  router.push(`/payments/${id}`)
}
function goToEdit(id: string) {
  router.push(`/payments/new/${id}`)
}
</script>
