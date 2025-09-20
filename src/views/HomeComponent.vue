<template>
  <div class="max-w-5xl mx-auto p-8 space-y-8">
    <!-- Welcome Section -->
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold text-indigo-600">
        Welcome, {{ currUserName }}
      </h1>
      <p class="text-gray-600 mt-2">
        This is your Payment Management System dashboard. 
        Use the navigation above to manage users and payments.
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-show="store.getters.currUserDetails!=null">
      <div class="bg-white p-6 rounded-lg shadow text-center">
        <p class="text-gray-500 text-sm">Total Users</p>
        <p class="text-2xl font-bold">{{ totalUsers }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow text-center">
        <p class="text-gray-500 text-sm">Total Payments</p>
        <p class="text-2xl font-bold">{{ totalPayments }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex space-x-4 justify-center">
      <router-link
        to="/users"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        v-show="currUserDetails"
      >
        Manage Users
      </router-link>
      <router-link
        to="/payments"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        v-show="currUserDetails"
      >
        Manage Payments
      </router-link>
      <router-link
        to="/users/new"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700"
        v-show="!currUserDetails"
      >
        Login / Register
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Get current user details
const currUserDetails = computed(() => store.getters.getCurrUserDetails)
const currUserName = computed(() => currUserDetails.value?.name || 'Guest')

// Stats
const totalUsers = computed(() => store.getters.getUserList.length)
const totalPayments = computed(() => store.getters.getPaymentList.length)

// Logged in status
const isLoggedIn = computed(() => currUserDetails.value != null)
</script>
