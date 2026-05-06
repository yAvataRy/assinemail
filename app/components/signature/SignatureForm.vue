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
  <div class="w-full max-w-2xl mx-auto">
    <div class="bg-card rounded-lg shadow border border-border p-6">
      <h3 class="text-lg font-semibold mb-4">{{ t("app.title") }}</h3>

      <div class="space-y-4">
        <!-- Nome e Cargo -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">{{ t("form.fullName") }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">👤</span>
              <input
                v-model="data.name"
                type="text"
                :placeholder="t('form.namePlaceholder')"
                class="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">{{ t("form.title") }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">💼</span>
              <input
                v-model="data.title"
                type="text"
                :placeholder="t('form.title')"
                class="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Contato -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">{{ t("form.email") }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">✉️</span>
              <input
                v-model="data.email"
                type="email"
                class="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">{{ t("form.phone") }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">📞</span>
              <input
                v-model="data.phone"
                type="text"
                class="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Website e Empresa -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">{{ t("form.company") }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🏢</span>
              <input
                v-model="data.company"
                type="text"
                class="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">{{ t("form.website") }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🌐</span>
              <input
                v-model="data.website"
                type="text"
                class="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <hr class="border-border my-6" />

        <!-- Seleção de Template -->
        <div>
          <label class="block text-sm font-medium mb-1">{{ t("form.template") }}</label>
          <select
            v-model="data.templateId"
            class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>