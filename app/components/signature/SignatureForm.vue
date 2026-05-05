<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSignatureStore } from '~/stores/signature'

const store = useSignatureStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UTabs default-value="personal" class="w-full">
    <UTabsList class="grid w-full grid-cols-4 mb-4">
      <UTabsTrigger value="personal" class="text-xs gap-1">
        <User class="h-3.5 w-3.5" />
        {{ $t('form.personal') }}
      </UTabsTrigger>
      <UTabsTrigger value="work" class="text-xs gap-1">
        <Briefcase class="h-3.5 w-3.5" />
        {{ $t('form.work') }}
      </UTabsTrigger>
      <UTabsTrigger value="social" class="text-xs gap-1">
        <Link2 class="h-3.5 w-3.5" />
        {{ $t('form.social') }}
      </UTabsTrigger>
      <UTabsTrigger value="style" class="text-xs gap-1">
        <Settings2 class="h-3.5 w-3.5" />
        {{ $t('form.style') }}
      </UTabsTrigger>
    </UTabsList>

    <UTabsContent value="personal" class="space-y-3">
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.fullName') }}</Label>
        <UInput :model-value="data.name" @update:model-value="(v: string) => store.updateField('name', v)" :placeholder="$t('form.namePlaceholder')" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">E-mail</Label>
        <UInput :model-value="data.email" @update:model-value="(v: string) => store.updateField('email', v)" placeholder="email@exemplo.com" type="email" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.phone') }}</Label>
        <UInput :model-value="data.phone" @update:model-value="(v: string) => store.updateField('phone', v)" placeholder="+55 11 99999-9999" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.location') }}</Label>
        <UInput :model-value="data.location" @update:model-value="(v: string) => store.updateField('location', v)" placeholder="São Paulo, Brasil" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.photoUrl') }}</Label>
        <UInput :model-value="data.photoUrl" @update:model-value="(v: string) => store.updateField('photoUrl', v)" placeholder="https://..." />
      </div>
    </UTabsContent>

    <UTabsContent value="work" class="space-y-3">
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.title') }}</Label>
        <UInput :model-value="data.title" @update:model-value="(v: string) => store.updateField('title', v)" placeholder="Desenvolvedor Full Stack" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.companyLogo') }}</Label>
        <UInput :model-value="data.companyLogoUrl" @update:model-value="(v: string) => store.updateField('companyLogoUrl', v)" placeholder="https://..." />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.availability') }}</Label>
        <UInput :model-value="data.availability" @update:model-value="(v: string) => store.updateField('availability', v)" placeholder="Disponível" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.availabilityHours') }}</Label>
        <UInput :model-value="data.availabilityHours" @update:model-value="(v: string) => store.updateField('availabilityHours', v)" placeholder="Seg-Sex, 9h-18h" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.calendly') }}</Label>
        <UInput :model-value="data.calendlyUrl" @update:model-value="(v: string) => store.updateField('calendlyUrl', v)" placeholder="https://calendly.com/..." />
      </div>
    </UTabsContent>

    <UTabsContent value="social" class="space-y-3">
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">LinkedIn</Label>
        <UInput :model-value="data.linkedinUrl" @update:model-value="(v: string) => store.updateField('linkedinUrl', v)" placeholder="https://linkedin.com/in/..." />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">GitHub</Label>
        <UInput :model-value="data.githubUrl" @update:model-value="(v: string) => store.updateField('githubUrl', v)" placeholder="https://github.com/..." />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">WhatsApp</Label>
        <UInput :model-value="data.whatsappUrl" @update:model-value="(v: string) => store.updateField('whatsappUrl', v)" placeholder="https://wa.me/5511999999999" />
      </div>
      <div class="space-y-1">
        <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.portfolio') }}</Label>
        <UInput :model-value="data.portfolioUrl" @update:model-value="(v: string) => store.updateField('portfolioUrl', v)" placeholder="https://meusite.com" />
      </div>
    </UTabsContent>

    <UTabsContent value="style" class="space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1">
          <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.primaryColor') }}</Label>
          <div class="flex items-center gap-2">
            <input type="color" :value="data.primaryColor" @input="(e: Event) => store.updateField('primaryColor', (e.target as HTMLInputElement).value)" class="h-9 w-12 rounded-md border border-input cursor-pointer" />
            <UInput :model-value="data.primaryColor" @update:model-value="(v: string) => store.updateField('primaryColor', v)" class="h-9 text-sm font-mono" />
          </div>
        </div>
        <div class="space-y-1">
          <Label class="text-xs font-medium text-muted-foreground">{{ $t('form.secondaryColor') }}</Label>
          <div class="flex items-center gap-2">
            <input type="color" :value="data.secondaryColor" @input="(e: Event) => store.updateField('secondaryColor', (e.target as HTMLInputElement).value)" class="h-9 w-12 rounded-md border border-input cursor-pointer" />
            <UInput :model-value="data.secondaryColor" @update:model-value="(v: string) => store.updateField('secondaryColor', v)" class="h-9 text-sm font-mono" />
          </div>
        </div>
      </div>
    </UTabsContent>
  </UTabs>
</template>
