import { useGraphql } from '@/composables/useGraphql';

const GET_COUNTRIES = `
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

export function fetchCountries() {
  return useGraphql<{ countries: { code: string; name: string; emoji: string }[] }>(GET_COUNTRIES);
}
