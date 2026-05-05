export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2026-05-05',
  srcDir: 'app/',
  dirs: {
    pages: ['pages'],
    components: ['components'],
    layouts: ['layouts'],
    middleware: ['middleware'],
    plugins: ['plugins'],
    composables: ['composables'],
    utils: ['utils'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'pt',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales/',
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
  runtimeConfig: {
    public: {
      appName: 'AssineMail',
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
})
