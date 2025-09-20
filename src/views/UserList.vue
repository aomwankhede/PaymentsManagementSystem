<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">All Users</h1>
      <button
        @click="goToCreate"
        class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        v-show="store.getters.getCurrUserDetails?.role=='admin'"
      >
        <Plus class="h-4 w-4 mr-2" />
        Add User
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search users..."
            class="w-full pl-10 border rounded p-2"
          />
        </div>

        <!-- Status Filter -->
        <select v-model="statusFilter" class="border rounded p-2">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <!-- Role Filter -->
        <select v-model="roleFilter" class="border rounded p-2">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>

        <!-- Clear Filters -->
        <button
          @click="clearFilters"
          class="border rounded p-2 hover:bg-gray-100"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">User</th>
            <th class="p-3 text-left">Role</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Created</th>
            <th class="p-3 text-left">Last Login</th>
            <th class="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="hover:bg-gray-50"
          >
            <td class="p-3">
              <div>
                <p class="font-medium">{{ user.name }}</p>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
            </td>
            <td class="p-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="roleColor(user.role)"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="p-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="statusColor(user.status)"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="p-3">{{ formatDate(user.createdAt) }}</td>
            <td class="p-3">
              {{ user.lastLogin ? formatDate(user.lastLogin) : 'Never' }}
            </td>
            <td class="p-3 text-right">
              <div class="flex items-center justify-end space-x-2">
                <button
                  @click="editUser(user)"
                  class="border rounded p-1 hover:bg-gray-100"
                  v-show="store.getters.getCurrUserDetails?.role=='admin'"
                >
                  <Edit class="h-4 w-4" />
                </button>
                <button
                  @click="deleteUser(user.id)"
                  class="border rounded p-1 text-red-600 hover:bg-red-50"
                  v-show="store.getters.getCurrUserDetails?.role=='admin'"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="filteredUsers.length === 0"
        class="text-center py-8 text-gray-500"
      >
        No users found matching your criteria.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Plus, Search, Edit, Trash2 } from 'lucide-vue-next'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
  status: 'active' | 'inactive'
  createdAt: string
  lastLogin?: string
}

const searchTerm = ref('')
const statusFilter = ref('all')
const roleFilter = ref('all')
const router = useRouter()
const store = useStore()

// Pull users from store
const users = computed<User[]>(() => {
    //get userList from localStorage
    return store.getters.getUserList
})

// Computed filtered list
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesStatus =
      statusFilter.value === 'all' || user.status === statusFilter.value

    const matchesRole =
      roleFilter.value === 'all' || user.role === roleFilter.value

    return matchesSearch && matchesStatus && matchesRole
  })
})

// Actions
function clearFilters() {
  searchTerm.value = ''
  statusFilter.value = 'all'
  roleFilter.value = 'all'
}

function deleteUser(id: string) {
  store.dispatch('deleteUser', id)
}

function editUser(user: User) {
  router.push({ name: 'UserEdit', params: { id: user.id } })
}

function goToCreate() {
  router.push({ name: 'UserForm' })
}

// Helpers
function statusColor(status: User['status']) {
  return status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}

function roleColor(role: User['role']) {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800'
    case 'manager':
      return 'bg-blue-100 text-blue-800'
    case 'user':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
