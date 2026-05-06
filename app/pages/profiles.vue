<script setup lang="ts">
import { Trash2, Edit, FolderOpen, ArrowLeft } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useProfilesStore } from "~/stores/profiles";
import { useToast } from "~/composables/useToast";
import { navigateTo } from "#imports";
import { computed, onMounted } from "vue";

definePageMeta({ middleware: [] });

const authStore = useAuthStore();
const profilesStore = useProfilesStore();
const toast = useToast();

const profiles = computed(() => profilesStore.getProfiles());

onMounted(() => {
  if (!authStore.user) {
    navigateTo("/login");
    return;
  }
  profilesStore.hydrate();
});

function handleDelete(id: string) {
  profilesStore.deleteProfile(id);
  toast.success("Perfil removido");
}

function handleLoad(profile: any) {
  const encoded = btoa(encodeURIComponent(JSON.stringify(profile.data)));
  navigateTo(`/?sig=${encoded}`);
}
</script>

<template>
  <div class="min-h-screen bg-background p-4">
    <div class="container max-w-2xl py-10">
      <button
        type="button"
        @click="navigateTo('/')"
        class="flex items-center gap-1 px-3 py-1.5 text-sm hover:bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-ring mb-6"
      >
        <ArrowLeft class="h-3.5 w-3.5" />Voltar
      </button>

      <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <FolderOpen class="h-5 w-5 text-primary" />Perfis Salvos
      </h1>

      <template v-if="profiles.length === 0">
        <div class="bg-card rounded-lg shadow border border-border">
          <div class="py-12 text-center text-muted-foreground">
            <p>Nenhum perfil salvo ainda.</p>
            <button
              type="button"
              @click="navigateTo('/')"
              class="mt-4 px-4 py-2 border border-input rounded-md bg-background hover:bg-muted"
            >
              Criar assinatura
            </button>
          </div>
        </div>
      </template>

      <div v-else class="space-y-3">
        <div v-for="p in profiles" :key="p.id" class="bg-card rounded-lg shadow border border-border">
          <div class="flex items-center justify-between py-4 px-4">
            <div>
              <h3 class="font-medium text-sm">{{ p.name }}</h3>
              <p class="text-xs text-muted-foreground">
                {{ p.data.title }} · {{ p.data.email }}
              </p>
              <p class="text-xs text-muted-foreground">
                Atualizado:
                {{ p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("pt-BR") : "-" }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                @click="handleLoad(p)"
                class="flex items-center gap-1 px-3 py-1.5 text-sm border border-input rounded-md bg-background hover:bg-muted"
              >
                <Edit class="h-3.5 w-3.5" />Editar
              </button>
              <button
                type="button"
                @click="handleDelete(p.id)"
                class="flex items-center gap-1 px-3 py-1.5 text-sm hover:bg-muted rounded-md"
              >
                <Trash2 class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p
        v-if="authStore.user && !authStore.isPremium()"
        class="text-xs text-muted-foreground mt-4 text-center"
      >
        {{ profiles.length }}/3 perfis usados (Free).
        <button @click="navigateTo('/plans')" class="text-primary underline">
          Upgrade para ilimitado
        </button>
      </p>
    </div>
  </div>
</template>
