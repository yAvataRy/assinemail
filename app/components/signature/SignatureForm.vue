<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSignatureStore } from "~/stores/signature";
import { useI18n } from "vue-i18n";

const signatureStore = useSignatureStore();
const { data } = storeToRefs(signatureStore);
const { t } = useI18n();

// Opções para o seletor de templates
const templateOptions = [
  { label: "Modern", value: "modern" },
  { label: "Classic", value: "classic" },
];
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <h3 class="text-lg font-semibold">{{ t("form.title") }}</h3>
    </template>

    <div class="space-y-4">
      <!-- Nome e Cargo -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup :label="t('form.name')">
          <UInput
            v-model="data.name"
            icon="i-lucide-user"
            placeholder="Vinícius Pulcher"
          />
        </UFormGroup>

        <UFormGroup :label="t('form.role')">
          <UInput
            v-model="data.role"
            icon="i-lucide-briefcase"
            placeholder="Frontend Developer"
          />
        </UFormGroup>
      </div>

      <!-- Contato -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup :label="t('form.email')">
          <UInput v-model="data.email" type="email" icon="i-lucide-mail" />
        </UFormGroup>

        <UFormGroup :label="t('form.phone')">
          <UInput v-model="data.phone" icon="i-lucide-phone" />
        </UFormGroup>
      </div>

      <!-- Website e Empresa -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup :label="t('form.company')">
          <UInput v-model="data.company" icon="i-lucide-building" />
        </UFormGroup>

        <UFormGroup :label="t('form.website')">
          <UInput v-model="data.website" icon="i-lucide-globe" />
        </UFormGroup>
      </div>

      <UDivider class="my-6" />

      <!-- Seleção de Template -->
      <UFormGroup :label="t('form.template')">
        <USelect v-model="data.template" :options="templateOptions" />
      </UFormGroup>
    </div>
  </UCard>
</template>