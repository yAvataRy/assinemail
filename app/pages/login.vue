<script setup lang="ts">
import { LogIn, ArrowLeft } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useToast } from "~/composables/useToast";
import { navigateTo } from "#imports";
import { ref } from "vue";

definePageMeta({ middleware: [] });

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const toast = useToast();

function handleSubmit() {
  const user = authStore.login(email.value, password.value);
  if (user) {
    toast.success(`Bem-vindo, ${user.name}!`);
    navigateTo("/");
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="w-full max-w-sm">
      <div class="bg-card rounded-lg shadow border border-border p-6">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold">Entrar no SigGen</h2>
          <p class="text-sm text-muted-foreground">
            Use as contas demo ou crie a sua
          </p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1">
            <label for="email" class="block text-sm font-medium">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="email@exemplo.com"
              required
              class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div class="space-y-1">
            <label for="password" class="block text-sm font-medium">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••"
              required
              class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            class="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <LogIn class="h-4 w-4" />Entrar
          </button>
        </form>

        <div
          class="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground space-y-1"
        >
          <p class="font-medium">Contas demo:</p>
          <p>📧 joao@exemplo.com / 123456 (Free)</p>
          <p>📧 maria@exemplo.com / 123456 (Premium)</p>
        </div>

        <button
          type="button"
          @click="navigateTo('/')"
          class="mt-3 w-full flex items-center justify-center gap-1 px-3 py-2 text-sm hover:bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <ArrowLeft class="h-3.5 w-3.5" />Voltar ao editor
        </button>
      </div>
    </div>
  </div>
</template>
