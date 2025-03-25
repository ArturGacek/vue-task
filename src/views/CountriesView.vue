<template>
  <div
    class="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-10 border border-border-light-gray"
  >
    <h2 class="text-2xl font-bold mb-4">Countries</h2>
    <div v-if="loading" class="text-secondary">Loading...</div>
    <AppErrorBanner v-if="error" :message="error" class="mb-4" />
    <ul v-if="Array.isArray(data) && data.length" class="space-y-2">
      <li v-for="country in data" :key="country.code" class="border border-border-light-gray py-2">
        <span class="font-semibold">{{ country.name }} </span>
        <span>{{ country.emoji }}</span>
      </li>
    </ul>
    <div v-else-if="!loading && !error && data?.length === 0">
      No countries available.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { fetchCountries } from '@/services/countriesService';
import AppErrorBanner from '@/components/AppErrorBanner.vue';

const { data, error, loading, fetchData } = fetchCountries();

onMounted(() => {
  fetchData();
});
</script>
