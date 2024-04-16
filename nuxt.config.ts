import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '~trix': fileURLToPath(new URL('./node_modules/trix', import.meta.url))
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'radix-vue/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/fontaine',
    '@vueuse/motion/nuxt',
  ],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'mdi', 'lucide', 'fluent-mdl2', 'radix-icons', 'bi']
  },
  // fontMetrics: {
  //   fonts: [
  //     {
  //       family: 'Nasalization',
  //       src: 'https://fonts.cdnfonts.com/s/26353/NASALIZA.woff'
  //     }
  //   ],
  // },
})