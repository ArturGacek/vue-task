<template>
  <button
    :id="id"
    :class="buttonClass"
    :disabled="isDisabled"
    @click="$emit('click')"
    :aria-label="ariaLabel"
    class="px-4 py-2 rounded focus:outline-none"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface IButtonProps {
  id: string;
  label: string;
  color?: 'primary' | 'secondary' | 'cta';
  isDisabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<IButtonProps>(), {
  color: 'primary',
  isDisabled: false,
  ariaLabel: undefined,
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'bg-primary text-white hover:bg-secondary transition-colors';
    case 'secondary':
      return 'bg-secondary text-white hover:opacity-80 disabled:opacity-50 transition-opacity';
    case 'cta':
      return 'bg-cta text-white hover:opacity-80 disabled:opacity-50 transition-opacity';
    default:
      return 'bg-primary text-white text-white hover:bg-secondary transition-colors';
  }
});
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
