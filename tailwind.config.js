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
      // Fluid Typography (Mevcut)
      fontSize: {
        display: "clamp(2.75rem, 1.56rem + 4.23vw, 5rem)",
        h1: "clamp(2.25rem, 1.32rem + 3.29vw, 4rem)",
        h2: "clamp(1.75rem, 1.09rem + 2.35vw, 3rem)",
        h3: "clamp(1.5rem, 1.1rem + 1.41vw, 2.25rem)",
        h4: "clamp(1.25rem, 0.99rem + 0.94vw, 1.75rem)",
        body: "clamp(1rem, 0.93rem + 0.24vw, 1.125rem)",
        small: "clamp(0.8125rem, 0.75rem + 0.24vw, 0.9375rem)",
      },
      // YENİ EKLENEN: Fluid Spacing (Padding/Margin)
      spacing: {
        xs: "clamp(0.25rem, 0.16rem + 0.38vw, 0.5rem)", // 4px -> 8px
        sm: "clamp(0.75rem, 0.66rem + 0.38vw, 1rem)", // 12px -> 16px
        md: "clamp(1.25rem, 0.99rem + 1.13vw, 2rem)", // 20px -> 32px (Grid Gap)
        layout: "clamp(2.5rem, 1.99rem + 2.25vw, 4rem)", // 40px -> 64px (Layout Pad)
        xl: "clamp(4rem, 3.24rem + 3.76vw, 6.25rem)", // 64px -> 100px
        section: "clamp(6.25rem, 4.56rem + 8.45vw, 11.25rem)", // 100px -> 180px
      },
    },
  },
  plugins: [],
};
