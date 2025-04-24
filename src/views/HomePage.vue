<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            class="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <AppErrorBanner v-if="error" :message="error" class="mb-4" />

        <AppButton
          id="login"
          class="mt-4 w-full"
          color="cta"
          label="Login"
          aria-label="Login"
        />
      </form>

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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthUserStore } from '@/store/useAuthUserStore';
import { useAppSettingsStore } from '@/store/useAppSettings';

import AppErrorBanner from '@/components/AppErrorBanner.vue';
import AppButton from '@/components/AppButton.vue';

import { mockUsers } from '@/mocks/mockUsers';
import { AuthCredentials } from '@/types/authCredentials';

const auth = useAuthUserStore();
const appSettings = useAppSettingsStore();

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const mockModeLabel = computed(() =>
  appSettings.isMockMode ? 'Disable Mock Mode' : 'Enable Mock Mode'
);

function handleLogin() {
  const foundUser = mockUsers.find(
    (user: AuthCredentials) =>
      user.username === username.value && user.password === password.value
  );

  if (foundUser) {
    error.value = '';
    auth.login({
      id: foundUser.id,
      name: foundUser.username,
      isAdmin: foundUser.isAdmin,
    });
    router.push('/countries');
  } else {
    error.value = 'Invalid credentials';
  }
}
</script>
