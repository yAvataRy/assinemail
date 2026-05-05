import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import type { SignatureData, TemplateInfo } from "~/types/signature";
import { DEFAULT_SIGNATURE } from "~/types/signature";
import { TEMPLATES } from "~/utils/signatureTemplates";

export const useSignatureStore = defineStore("signature", () => {
  const data = ref<SignatureData>({ ...DEFAULT_SIGNATURE });
  const selectedTemplate = ref<string>("modern");
  const qrDataUrl = ref<string>("");

  const isPremium = computed(() => {
    const authStore = useAuthStore();
    return authStore.user?.plan === "premium";
  });

  const currentTemplate = computed(() => {
    return (
      TEMPLATES.find((t) => t.id === data.value.templateId) || TEMPLATES[0]
    );
  });

  function updateField(field: keyof SignatureData, value: string) {
    data.value = { ...data.value, [field]: value };
  }

  function setTemplate(id: string) {
    selectedTemplate.value = id;
    data.value.templateId = id;
  }

  function setData(newData: Partial<SignatureData>) {
    data.value = { ...data.value, ...newData };
  }

  function reset() {
    data.value = { ...DEFAULT_SIGNATURE };
    selectedTemplate.value = "modern";
  }

  async function generateQRCode(url: string | undefined) {
    if (!url) {
      qrDataUrl.value = "";
      return;
    }
    const QRCode = await import("qrcode");
    try {
      qrDataUrl.value = await QRCode.toDataURL(url, { width: 160, margin: 1 });
    } catch {
      qrDataUrl.value = "";
    }
  }

  watch(
    () => data.value.whatsappUrl,
    (newUrl) => {
      generateQRCode(newUrl);
    },
    { immediate: true },
  );

  return {
    data,
    selectedTemplate,
    qrDataUrl,
    isPremium,
    currentTemplate,
    updateField,
    setTemplate,
    setData,
    reset,
    generateQRCode,
  };
});
