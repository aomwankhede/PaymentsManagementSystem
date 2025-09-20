<template>
  <nav class="bg-white shadow border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/">
          <span class="text-xl font-bold text-indigo-600 tracking-wide">PMS</span>
          </router-link>
        </div>

        <!-- Links -->
        <div class="hidden md:flex space-x-6">
          <router-link
            to="/"
            class="relative text-gray-700 hover:text-indigo-600 transition"
            active-class="font-semibold text-indigo-600"
            exact
          >
            Dashboard
            <span
              v-if="$route.path === '/'"
              class="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded"
            />
          </router-link>
          <router-link
            to="/users"
            class="relative text-gray-700 hover:text-indigo-600 transition"
            active-class="font-semibold text-indigo-600"
          >
            Users
            <span
              v-if="$route.path.startsWith('/users')"
              class="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded"
            />
          </router-link>
          <router-link
            to="/payments"
            class="relative text-gray-700 hover:text-indigo-600 transition"
            active-class="font-semibold text-indigo-600"
          >
            Payments
            <span
              v-if="$route.path.startsWith('/payments')"
              class="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded"
            />
          </router-link>
        </div>

        <!-- User profile -->
        <div class="flex items-center space-x-4">
          <template v-if="currUserDetails">
            <img
              :src="userAvatar"
              alt="User Avatar"
              class="h-8 w-8 rounded-full border shadow-sm"
            />
            <span class="hidden sm:block text-gray-700 font-medium">
              {{ currUserName }}
            </span>
            <!-- Logout button -->
            <button
              @click="logout"
              class="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition"
            >
              Logout
            </button>
          </template>

          <router-link
            v-else
            to="/users/new"
            class="text-indigo-600 hover:underline"
          >
            Login / Register
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Get current user details from store
const currUserDetails = computed(() => store.getters.getCurrUserDetails)

// Display user name (fallback to "Admin")
const currUserName = computed(() => currUserDetails.value?.name || 'Admin')

// Display user avatar (fallback to generated avatar)
const userAvatar = computed(() => {
  if (currUserDetails.value?.name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      currUserDetails.value.name
    )}`
  }
  return 'https://ui-avatars.com/api/?name=Admin'
})

// Logout function
function logout() {
  store.commit('setCurrUserDetails', null) // clear current user
  localStorage.removeItem('currUserDetails') // if stored locally
  router.push('/')
}
</script>
