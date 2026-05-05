<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
onMounted(() => {
  authStore.hydrate();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
