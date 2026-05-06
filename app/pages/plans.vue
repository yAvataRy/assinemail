<script setup lang="ts">
import { Check, Crown, ArrowLeft } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useToast } from "~/composables/useToast";
import { navigateTo } from "#imports";
import { computed } from "vue";

definePageMeta({ middleware: [] });

const authStore = useAuthStore();
const premium = computed(() => authStore.isPremium());
const toast = useToast();

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    features: [
      "2 templates",
      "Exportação HTML",
      "3 perfis salvos",
      "QR Code básico",
      "Copiar HTML",
    ],
    cta: "Plano atual",
    highlight: false,
  },
  {
    name: "Premium",
    price: "R$ 29/mês",
    features: [
      "10+ templates exclusivos",
      "Exportação PNG/ZIP/SVG",
      "Perfis ilimitados",
      "Upload de imagens",
      "Suporte prioritário",
      "Compartilhamento por link",
      "Sem marca d'água",
    ],
    cta: "Ativar Premium",
    highlight: true,
  },
];

function handleUpgrade() {
  if (!authStore.user) {
    navigateTo("/login");
    return;
  }
  authStore.upgradePlan();
  toast.success("🎉 Premium ativado!");
}
</script>

<template>
  <div class="min-h-screen bg-background p-4">
    <div class="container max-w-3xl mx-auto py-10">
      <button
        type="button"
        @click="navigateTo('/')"
        class="flex items-center gap-1 px-3 py-1.5 text-sm hover:bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-6"
      >
        <ArrowLeft class="h-3.5 w-3.5" />Voltar
      </button>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight">Escolha seu plano</h1>
        <p class="text-muted-foreground mt-2">
          Desbloqueie recursos exclusivos para suas assinaturas
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6">
        <div v-for="(plan, i) in plans" :key="plan.name">
          <div
            :class="[
              'bg-card rounded-lg shadow border p-6',
              plan.highlight ? 'border-2 border-primary shadow-lg' : 'border-border'
            ]"
          >
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-2">
                <Crown v-if="plan.highlight" class="h-5 w-5 text-brand-warm" />
                <h3 class="font-semibold">{{ plan.name }}</h3>
              </div>
              <p class="text-2xl font-bold">{{ plan.price }}</p>
            </div>
            <div class="space-y-4">
              <ul class="space-y-2">
                <li
                  v-for="f in plan.features"
                  :key="f"
                  class="flex items-center gap-2 text-sm"
                >
                  <Check class="h-4 w-4 text-primary flex-shrink-0" />{{ f }}
                </li>
              </ul>
              <button
                v-if="plan.highlight"
                type="button"
                @click="handleUpgrade"
                :disabled="premium"
                class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ premium ? "✅ Premium ativo" : plan.cta }}
              </button>
              <button
                v-else
                type="button"
                disabled
                class="w-full px-4 py-2 border border-input rounded-md bg-background opacity-50 cursor-not-allowed"
              >
                {{ plan.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
