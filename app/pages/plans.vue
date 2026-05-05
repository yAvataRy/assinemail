<script setup lang="ts">
import { Check, Crown, ArrowLeft } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useToast, navigateTo } from "#imports";
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
  toast.success("🎉 Premium ativado!", {
    description: "Todos os recursos estão disponíveis.",
  });
}
</script>

<template>
  <div class="min-h-screen bg-background p-4">
    <div class="container max-w-3xl py-10">
      <UButton
        variant="ghost"
        size="sm"
        @click="navigateTo('/')"
        class="mb-6 gap-1"
      >
        <ArrowLeft class="h-3.5 w-3.5" />Voltar
      </UButton>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight">Escolha seu plano</h1>
        <p class="text-muted-foreground mt-2">
          Desbloqueie recursos exclusivos para suas assinaturas
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6">
        <div v-for="(plan, i) in plans" :key="plan.name">
          <UCard
            :class="plan.highlight ? 'border-2 border-primary shadow-lg' : ''"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <Crown v-if="plan.highlight" class="h-5 w-5 text-brand-warm" />
                {{ plan.name }}
              </div>
              <p class="text-2xl font-bold">{{ plan.price }}</p>
            </template>
            <div class="space-y-4">
              <ul class="space-y-2">
                <li
                  v-for="f in plan.features"
                  :key="f"
                  class="flex items-center gap-2 text-sm"
                >
                  <Check class="h-4 w-4 text-primary" />{{ f }}
                </li>
              </ul>
              <UButton
                v-if="plan.highlight"
                @click="handleUpgrade"
                class="w-full"
                :disabled="premium"
              >
                {{ premium ? "✅ Premium ativo" : plan.cta }}
              </UButton>
              <UButton v-else variant="outline" class="w-full" disabled>
                {{ plan.cta }}
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
