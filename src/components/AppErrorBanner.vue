<template>
  <div class="text-error text-12 p-1">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
