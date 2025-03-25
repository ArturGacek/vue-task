import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import { fetchUsers } from '@/services/userService';
import { User } from '@/types/user';

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([]);
  const { data, loading, error, fetchData } = useApi<User[]>(fetchUsers);

  const hasUsers = computed(() => users.value.length > 0);

  watch(data, (newData) => {
    if (newData && Array.isArray(newData)) {
      users.value = newData;
    }
  });

  return { users, loading, error, fetchData, hasUsers };
});
