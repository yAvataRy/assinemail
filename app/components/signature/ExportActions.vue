<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSignatureStore } from "~/stores/signature";
import { useAuthStore } from "~/stores/auth";
import { renderSignature } from "~/utils/signatureTemplates";
import { toPng } from "html-to-image";
import { ref } from "vue";
import { useToast } from "~/composables/useToast";
import { Copy, Download, Image, Share2 } from "lucide-vue-next";

const store = useSignatureStore();
const authStore = useAuthStore();
const { data, qrDataUrl } = storeToRefs(store);
const previewRef = ref<HTMLDivElement | null>(null);
const toast = useToast();

const emit = defineEmits<{
  (e: "upgrade-click"): void;
}>();

function copyHtml() {
  const html = renderSignature(data.value, qrDataUrl.value);
  navigator.clipboard.writeText(html);
  toast.success("HTML copiado!");
}

function downloadHtml() {
  const html = renderSignature(data.value, qrDataUrl.value);
  const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Assinatura - ${data.value.name}</title></head><body>${html}</body></html>`;
  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `assinatura-${data.value.name
    .replace(/\s+/g, "-")
    .toLowerCase()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

async function exportPng() {
  if (!authStore.isPremium()) {
    emit("upgrade-click");
    return;
  }
  if (!previewRef.value) return;
  try {
    const dataUrl = await toPng(previewRef.value, {
      quality: 1,
      pixelRatio: 2,
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `assinatura-${data.value.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`;
    a.click();
    toast.success("PNG exportado!");
  } catch {
    toast.error("Erro ao exportar PNG");
  }
}

function shareLink() {
  const encoded = btoa(encodeURIComponent(JSON.stringify(data.value)));
  const url = `${window.location.origin}?sig=${encoded}`;
  navigator.clipboard.writeText(url);
  toast.success("Link copiado!");
}

defineExpose({ previewRef });
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      @click="copyHtml"
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <Copy class="h-3.5 w-3.5" />
      Copiar HTML
    </button>
    <button
      type="button"
      @click="downloadHtml"
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <Download class="h-3.5 w-3.5" />
      Baixar .html
    </button>
    <button
      type="button"
      @click="exportPng"
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <Image class="h-3.5 w-3.5" />
      PNG {{ !authStore.isPremium() ? "🔒" : "" }}
    </button>
    <button
      type="button"
      @click="shareLink"
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm hover:bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <Share2 class="h-3.5 w-3.5" />
      Compartilhar
    </button>
  </div>
</template>
