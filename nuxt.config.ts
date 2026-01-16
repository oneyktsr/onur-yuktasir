// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  // Pluginler
  plugins: ["~/plugins/gsap.client.ts"],

  // Modüller
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/seo", "@nuxt/content"],

  // Site Ayarları
  site: {
    url: "https://example.com",
    name: "Site Adı",
    description: "Portfolio and Insights",
    defaultLocale: "en",
    indexable: true,
  },

  content: {
    highlight: {
      theme: "github-dark",
    },
    markdown: {
      anchorLinks: false,
    },
  } as any,

  css: ["~/assets/css/main.css"],
});
