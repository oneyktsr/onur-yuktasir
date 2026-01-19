// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  // Dosyaların 'app' klasöründe olduğu için bunu eklemeliyiz:
  srcDir: "app",

  // Pluginler
  plugins: ["~/plugins/gsap.client.ts"],

  // Modüller
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/seo", "@nuxt/content"],

  // Site Ayarları
  site: {
    url: "https://onur-yuktasir.vercel.app",
    name: "Onur Yuktaşır",
    description: "Portfolio and Insights",
    defaultLocale: "en",
    indexable: true,
  },

  // --- APP KONFİGÜRASYONU ---
  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      meta: [
        // 1. Viewport: Siteyi çentik arkasına yayar
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
        },

        // 2. EKSİK OLAN PARÇA: Tema Rengi (Sitenin tepesini bej yapar, kesikliği giderir)
        { name: "theme-color", content: "#e4e0db" },

        // 3. iOS Web App Modu (Ana ekrana eklenirse şeffaf olur)
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      // 4. Body Padding Sıfırlama
      style: [{ innerHTML: "body { padding-top: 0px !important; }" }],
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

  // CSS Yolu (srcDir: 'app' eklediğimiz için artık doğru çalışacak)
  css: ["~/assets/css/main.css"],
});
