<script setup lang="ts">
definePageMeta({
  layout: "default",
});

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <UContainer class="py-10">
    <div class="text-center mb-10">
      <h1
        class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
      >
        Assine<span class="text-primary-500">Mail</span>
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {{ t("home.subtitle") }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Lado Esquerdo: Formulário -->
      <section>
        <SignatureForm />
      </section>

      <!-- Lado Direito: Preview e Export -->
      <section class="space-y-6">
        <SignaturePreview />
        <ExportActions />
      </section>
    </div>
  </UContainer>
</template>