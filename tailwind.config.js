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
      // GÜNCELLENEN KISIM: Daha Dengeli Fluid Typography
      // Min değerler (Mobil) sabit.
      // Max değerler ve Büyüme Hızı (vw) "aşırı büyüme" hissiyatını alacak şekilde yumuşatıldı.
      fontSize: {
        // Hero Başlık: Mobilde 2.75rem -> Büyük ekranda max 7.5rem (Eskisi 9.5rem idi, çok büyüktü)
        display: "clamp(2.75rem, 1.5rem + 4.5vw, 7.5rem)",

        // H1 Sayfa Başlıkları
        h1: "clamp(2.25rem, 1.2rem + 3.5vw, 5.5rem)",

        // H2 Bölüm Başlıkları
        h2: "clamp(1.75rem, 1rem + 2.5vw, 4.5rem)",

        // H3 Kart Başlıkları
        h3: "clamp(1.5rem, 0.9rem + 2vw, 3.5rem)",

        // H4 ("We Create" Metni): Mobilde 1.25rem -> Büyük ekranda max 2.5rem
        // Bu ayar metnin TV'de dolgun ama devasa olmamasını sağlar.
        h4: "clamp(1.25rem, 0.9rem + 1.1vw, 2.5rem)",

        // Body ("Learn More" Butonu): Mobilde 1rem -> Büyük ekranda max 1.5rem
        body: "clamp(1rem, 0.85rem + 0.4vw, 1.5rem)",

        // Small
        small: "clamp(0.8125rem, 0.7rem + 0.25vw, 1rem)",
      },
      spacing: {
        xs: "clamp(0.25rem, 0.2rem + 0.15vw, 0.5rem)",
        sm: "clamp(0.5rem, 0.4rem + 0.3vw, 0.875rem)",
        md: "clamp(0.75rem, 0.6rem + 0.6vw, 1.5rem)",

        // Layout Padding: Kenar boşlukları ekran büyüdükçe orantılı artar
        layout: "clamp(1.25rem, 0.8rem + 2.5vw, 4rem)",

        xl: "clamp(2.5rem, 1.5rem + 3vw, 6rem)",
        section: "clamp(4rem, 2.5rem + 6vw, 12rem)",
      },
    },
  },
  plugins: [],
};
