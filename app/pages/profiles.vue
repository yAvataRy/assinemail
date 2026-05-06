<script setup lang="ts">
import { Trash2, Edit, FolderOpen, ArrowLeft } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useProfilesStore } from "~/stores/profiles";
import { useToast, navigateTo } from "#imports";
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
      <UButton
        variant="ghost"
        size="sm"
        @click="navigateTo('/')"
        class="mb-6 gap-1"
      >
        <ArrowLeft class="h-3.5 w-3.5" />Voltar
      </UButton>

      <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <FolderOpen class="h-5 w-5 text-primary" />Perfis Salvos
      </h1>

      <template v-if="profiles.length === 0">
        <div class="bg-card rounded-lg shadow border border-border">
          <template #content>
            <div class="py-12 text-center text-muted-foreground">
              <p>Nenhum perfil salvo ainda.</p>
              <UButton variant="outline" class="mt-4" @click="navigateTo('/')"
                >Criar assinatura</UButton
              >
            </div>
          </template>
        </div>
      </template>

      <div v-else class="space-y-3">
        <div v-for="(p, i) in profiles" :key="p.id">
          <div class="bg-card rounded-lg shadow border border-border">
            <template #content>
              <div class="flex items-center justify-between py-4">
                <div>
                  <h3 class="font-medium text-sm">{{ p.name }}</h3>
                  <p class="text-xs text-muted-foreground">
                    {{ p.data.title }} · {{ p.data.email }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    Atualizado:
                    {{
                      p.updatedAt
                        ? new Date(p.updatedAt).toLocaleDateString("pt-BR")
                        : "-"
                    }}
                  </p>
                </div>
                <div class="flex gap-2">
                  <UButton
                    variant="outline"
                    size="sm"
                    @click="handleLoad(p)"
                    class="gap-1"
                  >
                    <Edit class="h-3.5 w-3.5" />Editar
                  </UButton>
                  <UButton
                    variant="ghost"
                    size="sm"
                    @click="handleDelete(p.id)"
                    class="text-destructive"
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                  </UButton>
                </div>
              </div>
            </template>
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
