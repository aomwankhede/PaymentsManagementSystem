<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Payment Details</h1>
      <div class="space-x-2">
        <button
          @click="goBack"
          class="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          @click="goToEdit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          v-show="store.getters.getCurrUserDetails.role=='admin' || store.getters.getCurrUserDetails.role=='manager'"
        >
          Edit
        </button>
      </div>
    </div>

    <div v-if="payment" class="bg-white shadow rounded-xl p-6 space-y-6">
      <div>
        <h2 class="text-xl font-semibold">Payment # {{ payment.id }}</h2>
        <p class="text-sm text-gray-500">
          Detailed information for this transaction
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500">User</p>
          <p class="font-medium">
            {{ user?.name || 'Unknown User' }} ({{ payment.userId }})
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Amount</p>
          <p class="font-medium">${{ payment.amount }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Status</p>
          <span
            class="px-2 py-1 text-sm font-medium rounded"
            :class="getStatusColor(payment.status)"
          >
            {{ payment.status }}
          </span>
        </div>

        <div>
          <p class="text-sm text-gray-500">Category</p>
          <span
            class="px-2 py-1 text-sm font-medium rounded"
            :class="getCategoryColor(payment.category)"
          >
            {{ payment.category }}
          </span>
        </div>

        <div>
          <p class="text-sm text-gray-500">Date</p>
          <p class="font-medium">{{ formatDate(payment.date) }}</p>
        </div>
      </div>

      <div class="pt-4 border-t">
        <p class="text-xs text-gray-400">
          Last created or updated {{ formatDate(new Date().toISOString()) }} by {{ payment.createdOrUpdatedBy }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import store from '@/store'

const route = useRoute()
const router = useRouter()

// Reactive payment
const payment = ref<Payment | null>(null)

// Computed user from store
const user = computed(() => {
  if (!payment.value) return null
  return store.getters.getUserList.find(
    (u: User) => u.id === payment.value?.userId
  )
})

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
  lastLogin?: string
}

interface Payment {
  id: string
  userId: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  category: string
  date: string
  createdOrUpdatedBy : string | undefined
}

onMounted(() => {
  const id = String(route.params.id)
  const currPayment = store.getters.getPaymentList.find(
    (p: Payment) => p.id === id
  )
  if (currPayment) {
    payment.value = currPayment
  }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
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

function goBack() {
  router.push('/payments')
}

function goToEdit() {
  if (payment.value) {
    router.push(`/payments/new/${payment.value.id}`)
  }
}
</script>
