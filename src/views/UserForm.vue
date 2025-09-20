<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
    <!-- Title -->
    <div>
      <h2 class="text-2xl font-bold">
        {{ isEdit ? 'Edit User' : isRegistrationForm ? 'Register User' : 'Login' }}
      </h2>
      <p class="text-gray-500 text-sm">
        <span v-if="isEdit">Update user details below.</span>
        <span v-else-if="isRegistrationForm">Fill in the details to create a new account.</span>
        <span v-else>Enter your credentials to log in.</span>
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-5">
      <!-- Name (only in Register/Edit) -->
      <div v-if="isRegistrationForm || isEdit">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter full name"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter email address"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      <!-- Role (only in Register/Edit) -->
      <div v-if="isRegistrationForm || isEdit">
        <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          v-model="form.role"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </div>

      <!-- Status (only in Edit) -->
      <div v-if="isEdit">
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="form.status"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="flex justify-between items-center pt-4">
        <!-- Cancel button only in Edit -->
        <button
          v-if="isEdit"
          type="button"
          @click="router.push('/users')"
          class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <!-- Submit button -->
        <button
          type="submit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {{ isEdit ? 'Update User' : isRegistrationForm ? 'Register' : 'Login' }}
        </button>
      </div>

      <!-- Register toggle -->
      <p
        v-if="!isEdit"
        class="text-sm text-indigo-600 cursor-pointer hover:underline"
        @click="toggleForm"
      >
        {{ isRegistrationForm ? 'Already have an account? Login' : 'Not a user? Register here' }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const route = useRoute()
const router = useRouter()
const store = useStore()

// Mode flags
const isEdit = computed(() => !!route.params.id)
const isRegistrationForm = ref(false)

// Form state
const form = reactive({
  id: '',
  name: '',
  email: '',
  role: 'user',
  status: 'active' // default for new user
})

// Pre-fill form when editing
onMounted(() => {
  if (isEdit.value) {
    const user = store.getters.getUserList.find(
      (u: any) => String(u.id) === String(route.params.id)
    )
    if (user) Object.assign(form, user)
  }
})

// Submit logic
async function submitForm() {
  if (isEdit.value) {
    // Update existing user
    await store.dispatch('editUser', { ...form })
  } else if (isRegistrationForm.value) {
    // Register new user
    const newUser = {
      ...form,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }
    await store.dispatch('createUser', newUser)
    await store.commit('setCurrUserDetails', newUser)
  } else {
    // Login → find user
    const existingUser = store.getters.getUserList.find(
      (u: any) => u.email === form.email
    )
    if (existingUser) {
      await store.dispatch('editUser', {
        ...existingUser,
        lastLogin: new Date().toISOString(),
      })
      await store.commit('setCurrUserDetails', existingUser)
    } else {
      alert('User not found. Please register first.')
      return
    }
  }

  // Redirect after action
  router.push('/users')
}

// Toggle between Login and Register
function toggleForm() {
  isRegistrationForm.value = !isRegistrationForm.value
}
</script>
