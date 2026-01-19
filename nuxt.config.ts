// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  srcDir: "app", // Dosya yolun bu şekilde

  plugins: ["~/plugins/gsap.client.ts"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/seo", "@nuxt/content"],

  site: {
    url: "https://onur-yuktasir.vercel.app",
    name: "Onur Yuktaşır",
    description: "Portfolio and Insights",
    defaultLocale: "en",
    indexable: true,
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
        },

        // RENK GARANTİSİ (Hem light hem dark modda bej olsun)
        { name: "theme-color", content: "#e4e0db" },
        {
          name: "theme-color",
          content: "#e4e0db",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#e4e0db",
          media: "(prefers-color-scheme: dark)",
        },

        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      style: [{ innerHTML: "body { padding-top: 0px !important; }" }],
    },
  },

  content: {
    highlight: { theme: "github-dark" },
    markdown: { anchorLinks: false },
  } as any,

  css: ["~/assets/css/main.css"],
});
