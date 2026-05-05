# Erros bloqueantes - signature-studio-nuxt

Este documento lista os erros gerais que estão impedindo a aplicação de rodar, com contexto e sugestões de correção.

Resumo dos problemas principais

- Resolução de caminhos/aliases (~/ and #imports) não encontrada pelo TypeScript/Vetur.
- Tipagens ausentes para dependências centrais (vue, pinia, nuxt, #imports, lucide-vue-next, etc.).
- Referências globais do Nuxt/Vue não reconhecidas: `definePageMeta`, `defineNuxtConfig`, `defineEventHandler`, `navigateTo`, `useI18n`, `useToast`, `#app`/`#imports`.
- Funções da Composition API usadas sem importar: `ref`, `computed`, `watch`, `onMounted`, `storeToRefs`.
- Módulos locais não encontrados: `~/utils/signatureTemplates`, `~/stores/*`, `~/types/signature`.
- Uso de `import.meta.client` gerando erro por opção `--module` do TS (configuração do TS target/module).

Arquivos com erros detectados (exemplos)

- `app/components/signature/SignaturePreview.vue` — importa `~/utils/signatureTemplates`, `~/stores/signature` e usa `ref`/`computed`/`storeToRefs` sem resolver tipos/imports.
- `app/components/signature/ExportActions.vue` — referências a `useToast` não reconhecidas pelo TS.
- `app/components/signature/SignatureForm.vue` — `useSignatureStore`, `storeToRefs`, `useI18n` não encontrados.
- `app/pages/*.vue` (index, login, plans, profiles) — `definePageMeta`, `useI18n`, `definePageMeta`, `navigateTo`, `useToast` marcados como não encontrados.
- `app/stores/*.ts` (auth.ts, profiles.ts, signature.ts) — `defineStore`, `ref`, `computed`, `watch`, `import.meta.client` e import de `~/types/signature` falhando.
- `app/utils/signatureTemplates.ts` — importa tipos `~/types/signature` e usa `TemplateInfo` sem declaração disponível.
- `nuxt.config.ts` — `defineNuxtConfig` não encontrado pelo TS.

Causas prováveis (raiz)

1. `tsconfig.json` / `nuxt.config.ts` não exportando/registrando as paths/types necessárias para o TypeScript resolver `~` e `#` aliases. Isso faz com que imports como `~/stores/...` e `#imports` falhem.
2. Dependências de desenvolvimento de tipagem ausentes (ex.: `@types/*`) ou pacotes tipados não instalados: `vue`, `@vue/runtime-core` types, `pinia`, `nuxt`, `@nuxt/schema`/`nuxt` types, `lucide-vue-next` types, etc.
3. Arquivos locais de tipos não existem (`app/types/signature.ts`) ou não estão no caminho correto, então imports `~/types/signature` falham.
4. Arquivos usam helpers de Nuxt auto-importados (`useToast`, `navigateTo`, `definePageMeta`, `useI18n`) mas o sistema de auto-imports (`#imports`) não está configurado ou as tipagens de auto-import não foram geradas/registradas.
5. `tsconfig.json` tem `module` alvo incompatível com `import.meta.client` — precisa ser `es2020`/`esnext`/node18+.

Passos recomendados para correção (ordem sugerida)

1. Verificar e ajustar `tsconfig.json`: garantir `compilerOptions.module` está em `es2020`/`esnext` e `types` inclui `nuxt` e `vitest` se necessário; adicionar `paths` para `~/*` -> `app/*` e `#imports` se preciso.
2. Confirmar que `nuxt` está configurado para gerar os tipos de auto-import (`nuxt.config.ts` com `imports: true` ou equivalente) e rodar `npx nuxi prepare` (ou `npm run dev`) para gerar tipos. Adicionar `ambient.d.ts` se necessário para aliases curtos.
3. Instalar tipagens / dependências faltantes: `pinia`, `@pinia/nuxt`, `vue`, `@vueuse/core` (se usado), e garantir `devDependencies` com pacotes de tipagem (ex.: `npm i -D @types/node`).
4. Criar/confirmar arquivos de tipos locais: `app/types/signature.ts` exportando `SignatureData`, `TemplateInfo`, `DEFAULT_SIGNATURE`, `UserAccount`, `SignatureProfile` conforme usados nos stores e templates.
5. Verificar e, onde necessário, adicionar imports explícitos da Composition API em componentes que usam `ref`, `computed`, `watch`, `onMounted`, `storeToRefs` (ex.: `import { ref, computed, watch, onMounted } from 'vue'` e `import { storeToRefs } from 'pinia'`).
6. Para `useToast`, `navigateTo`, `useI18n` — garantir que o Nuxt auto-imports esteja ativo e/ou importar explicitamente das fontes corretas (ex.: `import { useI18n } from 'vue-i18n'` ou `const toast = useNuxtApp().$toast` dependendo da implementação). Verificar `app/plugins` para registro de toast.
7. Ajustar o uso de `import.meta.client` se o ambiente de compilação/target estiver incorreto — ajustar `tsconfig.json` `module` ou substituir por `process.client` / `process.server` conforme padrão Nuxt 3/4.

Notas finais

- Depois de aplicar as correções acima, execute `npm run dev` e observe os erros restantes. Muitos dos 89 erros reportados vêm de um mesmo problema central: paths/tipagens não resolvidas. Resolver a configuração de TypeScript/Nuxt normalmente reduz a maior parte das falhas.
- Se desejar, eu posso aplicar automaticamente as correções iniciais: (A) ajustar `tsconfig.json` paths e `module`/`types`; (B) criar esqueleto de `app/types/signature.ts`; (C) adicionar imports faltantes em componentes/lojas. Informe se quer que eu prossiga com essas mudanças.

---

Gerado em: 2026-05-05
