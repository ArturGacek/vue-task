import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppSettingsStore = defineStore('appSettings', () => {
  const isMockMode = ref(false);

  function toggleMockMode() {
    isMockMode.value = !isMockMode.value;
  }

  return { isMockMode, toggleMockMode };
});
