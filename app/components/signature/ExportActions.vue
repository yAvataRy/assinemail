<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSignatureStore } from '~/stores/signature'
import { useAuthStore } from '~/stores/auth'
import { renderSignature } from '~/utils/signatureTemplates'
import { toPng } from 'html-to-image'

const store = useSignatureStore()
const authStore = useAuthStore()
const { data, qrDataUrl } = storeToRefs(store)
const previewRef = ref<HTMLDivElement | null>(null)

defineEmits<{
  (e: 'upgrade-click'): void
}>()

function copyHtml() {
  const html = renderSignature(data.value, qrDataUrl.value)
  navigator.clipboard.writeText(html)
  useToast().success('HTML copiado!', { description: 'Cole no seu cliente de e-mail.' })
}

function downloadHtml() {
  const html = renderSignature(data.value, qrDataUrl.value)
  const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Assinatura - ${data.value.name}</title></head><body>${html}</body></html>`
  const blob = new Blob([fullHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `assinatura-${data.value.name.replace(/\s+/g, '-').toLowerCase()}.html`
  a.click()
  URL.revokeObjectURL(url)
}

async function exportPng() {
  if (!authStore.isPremium()) {
    emit('upgrade-click')
    return
  }
  if (!previewRef.value) return
  try {
    const dataUrl = await toPng(previewRef.value, { quality: 1, pixelRatio: 2 })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `assinatura-${data.value.name.replace(/\s+/g, '-').toLowerCase()}.png`
    a.click()
    useToast().success('PNG exportado!')
  } catch {
    useToast().error('Erro ao exportar PNG')
  }
}

function shareLink() {
  const encoded = btoa(encodeURIComponent(JSON.stringify(data.value)))
  const url = `${window.location.origin}?sig=${encoded}`
  navigator.clipboard.writeText(url)
  useToast().success('Link copiado!', { description: 'Compartilhe este link com outros.' })
}

defineExpose({ previewRef })
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <UButton @click="copyHtml" size="sm" class="gap-1.5">
      <Copy class="h-3.5 w-3.5" />
      Copiar HTML
    </UButton>
    <UButton @click="downloadHtml" variant="outline" size="sm" class="gap-1.5">
      <Download class="h-3.5 w-3.5" />
      Baixar .html
    </UButton>
    <UButton @click="exportPng" variant="outline" size="sm" class="gap-1.5">
      <Image class="h-3.5 w-3.5" />
      PNG {{ !authStore.isPremium() ? '🔒' : '' }}
    </UButton>
    <UButton @click="shareLink" variant="ghost" size="sm" class="gap-1.5">
      <Share2 class="h-3.5 w-3.5" />
      Compartilhar
    </UButton>
  </div>
</template>
