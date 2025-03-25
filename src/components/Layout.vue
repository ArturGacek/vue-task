<template>
  <div>
    <Navigation />
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
</script>