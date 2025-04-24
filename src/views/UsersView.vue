<template>
  <div
    class="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-10 border border-border-light-gray"
  >
    <h1 class="text-2xl font-bold mb-6 text-center">Users List</h1>

    <AppErrorBanner
      v-if="userStore.error"
      :message="userStore.error"
      class="mb-4"
    />

    <AppButton
      @click="fetchData"
      :isDisabled="userStore.loading"
      :label="userStore.loading ? 'Loading...' : 'Fetch Users'"
      aria-label="Fetch Users"
      id="fetch-users-button"
      color="primary"
      class="w-full"
    />
    <ul v-if="userStore.hasUsers && !userStore.loading" class="mt-6 space-y-3">
      <li
        v-for="user in userStore.users"
        :key="user.id"
        class="p-3 bg-background rounded-lg flex justify-between"
      >
        <span>{{ user.name }}</span>
        <RouterLink
          :to="`/users/${user.id}`"
          class="text-primary hover:underline pl-4"
        >
          View Details
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import AppErrorBanner from '@/components/AppErrorBanner.vue';
import AppButton from '@/components/AppButton.vue';

const userStore = useUserStore();

const fetchData = async () => {
  if (!userStore.hasUsers) {
    await userStore.fetchData();
  }
};
</script>
