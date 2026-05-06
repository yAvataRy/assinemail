<script setup lang="ts">
import { renderSignature } from "~/utils/signatureTemplates";
import { useSignatureStore } from "~/stores/signature";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

const signatureStore = useSignatureStore();
const { data, qrDataUrl } = storeToRefs(signatureStore);

// Computado para renderizar o template correto
const signatureHtml = computed(() => {
  return renderSignature(data.value, qrDataUrl.value);
});

const containerRef = ref<HTMLElement | null>(null);
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="bg-card rounded-lg shadow border border-border overflow-hidden">
      <div class="px-6 py-4 border-b border-border">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">
            Preview
          </h3>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Live
          </span>
        </div>
      </div>

      <div class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 m-4 overflow-x-auto">
        <!-- Renderização do HTML Puro da Assinatura -->
        <div
          ref="containerRef"
          class="signature-container"
          v-html="signatureHtml"
        ></div>
      </div>

      <div class="px-6 py-3 border-t border-border">
        <p class="text-xs text-muted-foreground text-center">
          Esta é a aparência exata que sua assinatura terá nos e-mails.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signature-container {
  min-width: 300px;
  max-width: 100%;
}
</style>