import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthUserStore } from '@/store/useAuthUserStore';

export function useApi<T>(apiCall: () => Promise<T>) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const router = useRouter();
  const auth = useAuthUserStore();

  async function fetchData() {
    if (auth.isTokenExpired()) {
      auth.logout();
      router.push('/');
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await apiCall();
      data.value = result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, fetchData };
}
