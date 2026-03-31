export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
  ],

  css: [
    "~/assets/css/main.css",
  ],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  }
})
