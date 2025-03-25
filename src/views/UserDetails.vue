<template>
  <div
    class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-5 border border-border-light-gray"
  >
    <h1 class="text-2xl font-bold mb-4">User Details</h1>

    <p v-if="loading" class="text-gray">Loading user details...</p>

    <AppErrorBanner v-if="error" :message="error" class="mb-4" />

    <div v-if="user">
      <h2 class="text-lg font-semibold">{{ user.name }}</h2>
      <p class="text-gray">{{ user.email }}</p>

      <h3 class="mt-4 font-semibold">Address:</h3>
      <p class="text-gray">
        {{ user.address.street }}, {{ user.address.city }}
      </p>
    </div>
    <AppButton
      class="mt-4 w-full"
      @click="$router.push('/users')"
      color="cta"
      label="Back to Users"
      aria-label="Back to Users"
      id="back-to-users-button"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '@/composables/useApi';
import { fetchUserById } from '@/services/userService';
import AppErrorBanner from '@/components/AppErrorBanner.vue';
import AppButton from '@/components/AppButton.vue';
import { User } from '@/types/user';

const route = useRoute();

const {
  data: user,
  loading,
  error,
  fetchData,
} = useApi<User>(() => fetchUserById(route.params.id as string));

onMounted(() => {
  fetchData();
});
</script>
