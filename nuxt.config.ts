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

  // --- KRİTİK AYARLAR (Burası Eksikti) ---
  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      meta: [
        // 1. Sitenin çentik arkasına (en tepeye) uzanmasını sağlayan kod:
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
        },

        // 2. iOS Status Bar'ı şeffaflaştıran kod:
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      // 3. Body'nin yukarıdan boşluk bırakmasını engelleyen stil:
      style: [{ innerHTML: "body { padding-top: 0px !important; }" }],
    },
  },
  // ---------------------------------------

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
