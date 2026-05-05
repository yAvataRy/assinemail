<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSignatureStore } from '~/stores/signature'
import { useAuthStore } from '~/stores/auth'
import { useProfilesStore } from '~/stores/profiles'

const signatureStore = useSignatureStore()
const authStore = useAuthStore()
const profilesStore = useProfilesStore()
const { data } = storeToRefs(signatureStore)

const showUpgrade = ref(false)
const previewRef = ref<HTMLDivElement | null>(null)

const premium = computed(() => authStore.isPremium())

function handleSave() {
  if (!authStore.user) {
    navigateTo('/login')
    return
  }
  if (!profilesStore.canSaveMore(authStore.user)) {
    showUpgrade.value = true
    return
  }
  const profile = {
    id: crypto.randomUUID(),
    name: data.value.name || 'Sem nome',
    data: { ...data.value },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  profilesStore.saveProfile(profile)
  useToast().success('Perfil salvo!', { description: 'Acesse seus perfis para gerenciar.' })
}

onMounted(() => {
  const sigParam = useRoute().query.sig
  if (sigParam) {
    try {
      const parsed = JSON.parse(decodeURIComponent(atob(sigParam as string)))
      signatureStore.setData(parsed)
    } catch { /* ignore */ }
  }
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div class="container flex h-14 items-center justify-between">
        <h1 class="text-lg font-bold tracking-tight">
          <span class="text-primary">✉️ Sig</span>Gen
        </h1>
        <div class="flex items-center gap-2">
          <template v-if="authStore.user">
            <span class="text-xs text-muted-foreground hidden sm:inline">
              {{ authStore.user.email }} ·
              <span :class="premium ? 'text-brand-warm font-medium' : ''">
                {{ premium ? 'Premium ✨' : 'Free' }}
              </span>
            </span>
            <UButton variant="ghost" size="sm" @click="navigateTo('/profiles')" class="gap-1">
              <FolderOpen class="h-3.5 w-3.5" />
              Perfis
            </UButton>
            <UButton
              v-if="!premium"
              variant="outline"
              size="sm"
              @click="navigateTo('/plans')"
              class="gap-1 text-brand-warm border-brand-warm/30"
            >
              <Crown class="h-3.5 w-3.5" />
              Upgrade
            </UButton>
          </template>
          <template v-else>
            <UButton variant="outline" size="sm" @click="navigateTo('/login')" class="gap-1">
              <LogIn class="h-3.5 w-3.5" />
              Entrar
            </UButton>
          </template>
        </div>
      </div>
    </header>

    <main class="container py-6">
      <div class="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div class="space-y-4">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <User class="h-4 w-4 text-primary" />
                Dados da Assinatura
              </div>
            </template>
            <SignatureForm />
          </UCard>

          <UCard>
            <template #header>
              Templates
            </template>
            <TemplateSelector @upgrade-click="showUpgrade = true" />
          </UCard>
        </div>

        <div class="space-y-4">
          <UCard>
            <template #header>Preview</template>
            <SignaturePreview ref="previewRef" />
          </UCard>

          <UCard>
            <template #header>Exportar</template>
            <div class="space-y-3">
              <ExportActions @upgrade-click="showUpgrade = true" />
              <UButton variant="secondary" size="sm" @click="handleSave" class="w-full gap-1.5">
                <Save class="h-3.5 w-3.5" />
                Salvar perfil
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </main>

    <UpgradeModal v-model="showUpgrade" @upgraded="authStore.hydrate()" />
  </div>
</template>
