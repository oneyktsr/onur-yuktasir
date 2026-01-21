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
      fontWeight: {
        light: "200",
        normal: "250",
        medium: "250",
        bold: "250",
      },
      // GÜNCELLENEN KISIM: Fluid Typography & Spacing
      // Min değerler (Mobil) sabit tutuldu. Max değerler (TV) artırıldı.
      // 'vw' değerleri büyük ekranda dolgunluk sağlamak için optimize edildi.
      fontSize: {
        display: "clamp(2.75rem, 1rem + 6vw, 9.5rem)",
        h1: "clamp(2.25rem, 0.8rem + 5vw, 7.5rem)",
        h2: "clamp(1.75rem, 0.5rem + 4vw, 5.5rem)",
        h3: "clamp(1.5rem, 0.5rem + 3vw, 4rem)",
        h4: "clamp(1.25rem, 0.8rem + 1.5vw, 2.75rem)",
        body: "clamp(1rem, 0.75rem + 1vw, 1.8rem)",
        small: "clamp(0.8125rem, 0.65rem + 0.6vw, 1.25rem)",
      },
      spacing: {
        xs: "clamp(0.25rem, 0.2rem + 0.2vw, 0.5rem)",
        sm: "clamp(0.5rem, 0.4rem + 0.4vw, 1rem)",
        md: "clamp(0.75rem, 0.5rem + 0.8vw, 1.5rem)",
        layout: "clamp(1.25rem, 0.5rem + 3vw, 5rem)",
        xl: "clamp(2.5rem, 1rem + 4vw, 8rem)",
        section: "clamp(4rem, 2rem + 8vw, 16rem)",
      },
    },
  },
  plugins: [],
};
