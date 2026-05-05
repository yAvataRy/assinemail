<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSignatureStore } from '~/stores/signature'
import { TEMPLATES } from '~/utils/signatureTemplates'
import { useAuthStore } from '~/stores/auth'
import { Lock } from 'lucide-vue-next'

const store = useSignatureStore()
const authStore = useAuthStore()
const { data, isPremium } = storeToRefs(store)

defineProps<{
  onUpgradeClick?: () => void
}>()

function selectTemplate(id: string) {
  store.setTemplate(id)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="t in TEMPLATES"
      :key="t.id"
      @click="t.premium && !isPremium ? $emit('upgradeClick') : selectTemplate(t.id)"
      :class="[
        'relative flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-center transition-all hover:shadow-md',
        data.templateId === t.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/40',
        t.premium && !isPremium ? 'opacity-60' : ''
      ]"
    >
      <Lock v-if="t.premium && !isPremium" class="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
      <span class="text-2xl">{{ t.preview }}</span>
      <span class="text-xs font-medium">{{ t.name }}</span>
    </button>
  </div>
</template>
