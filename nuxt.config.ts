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

  // --- APP KONFİGÜRASYONU ---
  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      meta: [
        // 1. Viewport: 'viewport-fit=cover' ile site çentik arkasına kadar yayılır
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
        },

        // 2. iOS için Üst Barı Şeffaflaştırma (Site arkadan akar)
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },

        // 3. Fallback Tema Rengi (Diğer cihazlar için varsayılan bej rengi)
        { name: "theme-color", content: "#e4e0db" },
      ],
    },
  },
  // --------------------------

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
