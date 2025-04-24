<template>
  <div
    class="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-10 border border-border-light-gray"
  >
    <h2 class="text-2xl font-bold mb-4">Countries</h2>
    <div v-if="loading" class="text-secondary">Loading...</div>
    <AppErrorBanner v-if="error" :message="error" class="mb-4" />
    <ul v-if="Array.isArray(data) && data.length" class="space-y-2">
      <li
        v-for="country in data"
        :key="country.code"
        class="border border-border-light-gray py-2"
      >
        <span class="font-semibold">{{ country.name }} </span>
        <span>{{ country.emoji }}</span>
      </li>
    </ul>
    <div v-else-if="!loading && !error && data?.length === 0">
      No countries available.
    </div>

    <div v-if="attemptCount && appSettings.isMockMode" class="mt-4">
      <p>Retry attempt: {{ attemptCount }} of 3</p>

      <p class="text-center mt-4">
        Toggle server error simulation on CountriesView (for demo purposes).
        This will simulate a 500 error on the API.
      </p>
      <AppButton
        id="mock-mode"
        class="mt-2 w-full"
        :label="mockModeLabel"
        @click="appSettings.toggleMockMode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';

import { fetchCountries } from '@/services/countriesService';
import { useAppSettingsStore } from '@/store/useAppSettings';

import AppErrorBanner from '@/components/AppErrorBanner.vue';
import AppButton from '@/components/AppButton.vue';

const { data, error, loading, fetchData, attemptCount } = fetchCountries();
const appSettings = useAppSettingsStore();

const mockModeLabel = computed(() =>
  appSettings.isMockMode ? 'Disable Mock Mode' : 'Enable Mock Mode'
);

onMounted(() => {
  fetchData();
});
</script>
