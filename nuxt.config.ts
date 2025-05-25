// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: process.env.ENV === "DEV" },
  modules: ['@nuxt/content', '@nuxt/eslint', '@unocss/nuxt'],
  imports: {
    dirs: ["types"],
  },
})