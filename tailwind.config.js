/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#0d0e13",
        "custom-light": "#e4e0db",
      },
      fontFamily: {
        sans: ["TWKLausanne", "sans-serif"],
      },
      // YENİ EKLENEN KISIM: Ağırlık Eşleştirmesi (200/250)
      fontWeight: {
        light: "200", // font-light sınıfı artık 200 ağırlığını kullanır
        normal: "250", // font-normal sınıfı artık 250 ağırlığını kullanır
        medium: "250", // font-medium (Elde olmadığı için 250'ye bağlandı)
        bold: "250", // font-bold (Elde olmadığı için 250'ye bağlandı)
      },
      fontSize: {
        display: "clamp(2.75rem, 1.56rem + 4.23vw, 5rem)",
        h1: "clamp(2.25rem, 1.32rem + 3.29vw, 4rem)",
        h2: "clamp(1.75rem, 1.09rem + 2.35vw, 3rem)",
        h3: "clamp(1.5rem, 1.1rem + 1.41vw, 2.25rem)",
        h4: "clamp(1.25rem, 0.99rem + 0.94vw, 1.75rem)",
        body: "clamp(1rem, 0.93rem + 0.24vw, 1.125rem)",
        small: "clamp(0.8125rem, 0.75rem + 0.24vw, 0.9375rem)",
      },
      spacing: {
        xs: "clamp(0.25rem, 0.2rem + 0.13vw, 0.375rem)",
        sm: "clamp(0.5rem, 0.41rem + 0.23vw, 0.75rem)",
        md: "clamp(0.75rem, 0.66rem + 0.38vw, 1rem)",
        layout: "clamp(1.25rem, 0.99rem + 1.13vw, 2rem)",
        xl: "clamp(2.5rem, 1.99rem + 2.25vw, 4rem)",
        section: "clamp(4rem, 2.5rem + 5vw, 9rem)",
      },
    },
  },
  plugins: [],
};
