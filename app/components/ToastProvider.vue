<script setup lang="ts">
import { useToast } from "~/composables/useToast";

const { toasts } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-right',
          toast.type === 'success' && 'bg-green-500 text-white',
          toast.type === 'error' && 'bg-red-500 text-white',
          toast.type === 'info' && 'bg-primary text-primary-foreground',
        ]"
      >
        {{ toast.message }}
      </div>
    </div>
  </Teleport>
</template>