<template>
  <div class="min-h-screen flex flex-col">
    <navbar-component/>
    <main class="flex-1 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from './components/NavbarComponent.vue'
</script>
