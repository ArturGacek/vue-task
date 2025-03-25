import { ref } from 'vue';

export function useApi<T>(apiCall: () => Promise<T>) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  async function fetchData() {
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
