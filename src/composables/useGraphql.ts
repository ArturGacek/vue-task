import { ref } from 'vue';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
  cache: new InMemoryCache(),
});

export function useGraphql<T>(query: string) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  async function fetchData() {
    loading.value = true;
    error.value = null;
    try {
      const result = await client.query({ query: gql(query) });
      data.value = result.data.countries;
    } catch (err) {
      console.error(err);
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, fetchData };
}
