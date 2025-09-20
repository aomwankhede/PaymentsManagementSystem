<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
    <!-- Title -->
    <div>
      <h2 class="text-2xl font-bold">
        {{ isEdit ? 'Edit Payment' : 'Create Payment' }}
      </h2>
      <p class="text-gray-500 text-sm">
        {{ isEdit ? 'Update payment details below.' : 'Fill in the details to add a new payment.' }}
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-5">
      <!-- User (dropdown) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">User</label>
        <select
          v-model="form.userId"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        >
          <option value="" disabled>Select a user</option>
          <option
            v-for="user in userList"
            :key="user.id"
            :value="user.id"
          >
            {{ user.name }} ({{ user.email }})
          </option>
        </select>
      </div>

      <!-- Amount -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
        <input
          v-model.number="form.amount"
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter amount"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="form.status"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          v-model="form.category"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="loan">Loan</option>
          <option value="subscription">Subscription</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="router.push('/payments')"
          class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {{ isEdit ? 'Update Payment' : 'Create Payment' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const route = useRoute()
const router = useRouter()
const store = useStore()

// Get all users for dropdown
const userList = computed(() => store.getters.getUserList)

// Edit mode check
const isEdit = computed(() => route.params.id)

// Form state
const form = reactive({
  id: '',
  userId: '',
  amount: 0,
  status: 'pending',
  category: 'loan',
  date: new Date().toISOString().split('T')[0], // default today
})

// Pre-fill form in edit mode
onMounted(() => {
  if (isEdit.value) {
    const payment = store.getters.getPaymentList.find(
      (p: any) => String(p.id) === String(route.params.id)
    )
    if (payment) {
      Object.assign(form, payment)
    }
  }
})

// Handle submit
async function submitForm() {
  if (isEdit.value) {
    await store.dispatch('editPayment', { ...form })
  } else {
    await store.dispatch('createPayment', {
      ...form,
      id: uuidv4(),
    })
  }
  router.push('/payments')
}
</script>
