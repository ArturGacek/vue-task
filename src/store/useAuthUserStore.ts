import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { AuthUser } from '@/types/authUser';

export const useAuthUserStore = defineStore('authUser', () => {
  const user = ref<AuthUser | null>(null);
  const tokenExpiration = ref<number | null>(null);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.isAdmin === true);

  function login(payload: AuthUser) {
    user.value = payload;
    tokenExpiration.value = Date.now() + 10 * 1000;
    localStorage.setItem('user', JSON.stringify(payload));
    localStorage.setItem('tokenExp', tokenExpiration.value.toString());
  }

  function logout() {
    user.value = null;
    tokenExpiration.value = null;

    localStorage.removeItem('user');
    localStorage.removeItem('tokenExp');
  }

  function restoreUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    const storedExp = localStorage.getItem('tokenExp');

    if (storedUser && storedExp) {
      const exp = parseInt(storedExp);
      if (Date.now() > exp) {
        logout();
      } else {
        user.value = JSON.parse(storedUser);
        tokenExpiration.value = exp;
      }
    }
  }

  function isTokenExpired() {
    return tokenExpiration.value !== null && Date.now() > tokenExpiration.value;
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    restoreUserFromStorage,
    isTokenExpired,
  };
});
