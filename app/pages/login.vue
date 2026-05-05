<script setup lang="ts">
import { LogIn, ArrowLeft } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '#imports'

definePageMeta({ middleware: [] })

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const toast = useToast()

function handleSubmit() {
  const user = authStore.login(email.value, password.value)
  if (user) {
    toast.success(`Bem-vindo, ${user.name}!`, { description: `Plano: ${user.plan}` })
    navigateTo('/')
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="w-full max-w-sm">
      <UCard>
        <template #header>
          <div class="text-center">
            <h2 class="text-xl font-bold">Entrar no SigGen</h2>
            <p class="text-sm text-muted-foreground">Use as contas demo ou crie a sua</p>
          </div>
        </template>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1">
            <Label for="email">E-mail</Label>
            <UInput id="email" v-model="email" type="email" placeholder="email@exemplo.com" required />
          </div>
          <div class="space-y-1">
            <Label for="password">Senha</Label>
            <UInput id="password" v-model="password" type="password" placeholder="••••••" required />
          </div>
          <UButton type="submit" class="w-full gap-1.5">
            <LogIn class="h-4 w-4" />Entrar
          </UButton>
        </form>

        <div class="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
          <p class="font-medium">Contas demo:</p>
          <p>📧 joao@exemplo.com / 123456 (Free)</p>
          <p>📧 maria@exemplo.com / 123456 (Premium)</p>
        </div>

        <UButton variant="ghost" size="sm" @click="navigateTo('/')" class="mt-3 w-full gap-1">
          <ArrowLeft class="h-3.5 w-3.5" />Voltar ao editor
        </UButton>
      </UCard>
    </div>
  </div>
</template>
