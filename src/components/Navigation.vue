<template>
  <nav class="bg-background text-primary p-6 flex justify-between gap-4">
    <div class="space-x-4">
      <router-link to="/users" class="hover:underline">Users</router-link>
      <router-link v-if="auth.isAdmin" to="/countries" class="hover:underline"
        >Countries</router-link
      >
    </div>
    <button @click="logout" class="text-red-500 hover:underline">Logout</button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthUserStore } from '@/store/useAuthUserStore';

const auth = useAuthUserStore();

const router = useRouter();

function logout() {
  auth.logout();
  router.push('/');
}
</script>
