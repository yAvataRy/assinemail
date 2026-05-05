<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSignatureStore } from '~/stores/signature'
import { renderSignature } from '~/utils/signatureTemplates'
import { ref, computed, defineExpose } from 'vue'

const store = useSignatureStore()
const { data, qrDataUrl } = storeToRefs(store)

const previewRef = ref<HTMLDivElement | null>(null)

const renderedHtml = computed(() => {
  return renderSignature(data.value, qrDataUrl.value)
})

defineExpose({ previewRef })
</script>

<template>
  <div class="space-y-3">
    <div
      ref="previewRef"
      class="rounded-lg border border-border bg-card p-6 shadow-sm"
      v-html="renderedHtml"
    />
  </div>
</template>
