import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

import { useAppSettingsStore } from '@/store/useAppSettings';
import { useAuthUserStore } from '@/store/useAuthUserStore';

import { abortableDelay } from '@/utils/abortableDelay';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
  cache: new InMemoryCache(),
});

export function useGraphql<T>(query: string) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const router = useRouter();
  const attemptCount = ref(0);

  const appSettings = useAppSettingsStore();

  let abortController: AbortController | null = null;

  async function fetchData(retries = 3, delay = 2500) {
    if (abortController) {
      abortController.abort();
    }

    const auth = useAuthUserStore();
    if (auth.isTokenExpired()) {
      auth.logout();
      router.push('/');
      return;
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    loading.value = true;
    error.value = null;

    try {
      for (let attempt = 1; attempt <= retries; attempt++) {
        attemptCount.value = attempt;

        try {
          if (appSettings.isMockMode) {
            await abortableDelay(500, signal);
            throw new Error('Mocked 500 Internal Server Error');
          }

          const result = await client.query({
            query: gql(query),
            context: {
              fetchOptions: { signal },
            },
          });

          data.value = result.data.countries;
          return;
        } catch (err) {
          if ((err as Error).name === 'AbortError') {
            console.warn('Request aborted');
            return;
          }

          console.warn(`Attempt ${attempt} failed`, err);

          if (attempt === retries) {
            error.value = 'Service is unavailable. Redirecting to error page.';
            router.push('/error');
            return;
          }

          await abortableDelay(delay, signal);
        }
      }
    } finally {
      loading.value = false;
      abortController = null;
    }
  }

  return { data, error, loading, fetchData, attemptCount };
}
