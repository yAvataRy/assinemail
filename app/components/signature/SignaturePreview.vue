<script setup lang="ts">
import { renderModern, renderClassic } from "~/utils/signatureTemplates";
import { useSignatureStore } from "~/stores/signature";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const signatureStore = useSignatureStore();
const { data, qrDataUrl } = storeToRefs(signatureStore);

// Computado para renderizar o template correto
const signatureHtml = computed(() => {
  if ((data.value.template || data.value.templateId) === "modern") {
    return renderModern(data.value, qrDataUrl.value);
  }
  return renderClassic(data.value, qrDataUrl.value);
});

const containerRef = ref<HTMLElement | null>(null);
</script>

<template>
  <UCard class="overflow-hidden">
    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Preview
        </h3>
        <UBadge variant="subtle" color="primary">Live</UBadge>
      </div>
    </template>

    <div
      class="p-4 bg-white rounded-lg border border-gray-100 dark:border-gray-800 flex justify-center overflow-x-auto"
    >
      <!-- Renderização do HTML Puro da Assinatura -->
      <div
        ref="containerRef"
        class="signature-container"
        v-html="signatureHtml"
      ></div>
    </div>

    <template #footer>
      <p class="text-xs text-gray-500 text-center">
        Esta é a aparência exata que sua assinatura terá nos e-mails.
      </p>
    </template>
  </UCard>
</template>

<style scoped>
.signature-container {
  min-width: 300px;
  max-width: 100%;
}
</style>