export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true
  },

  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@pinia/colada-nuxt",
    "@pinia/nuxt"
  ],

  css: [
    "~/assets/css/main.css",
  ],

  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      dirs: [
        "server/services/**",
        "server/repositories/**",
      ],
    },
  },
});