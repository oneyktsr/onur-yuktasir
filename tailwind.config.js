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
      // GÜNCELLENEN KISIM: "Bir Tık Daha Küçük" Fluid Typography
      // Min değerler (Mobil) yine sabit.
      // Max değerler ve vw oranları düşürüldü -> Daha kontrollü büyüme.
      fontSize: {
        // Hero Başlık: Max 7.5rem'den 6rem'e çekildi. Hız 4.5vw'den 3.5vw'ye düştü.
        display: "clamp(2.75rem, 1.5rem + 3.5vw, 6rem)",

        // H1: Max 5.5rem'den 4.5rem'e çekildi.
        h1: "clamp(2.25rem, 1rem + 2.5vw, 4.5rem)",

        // H2: Max 4.5rem'den 3.75rem'e çekildi.
        h2: "clamp(1.75rem, 0.8rem + 2vw, 3.75rem)",

        // H3: Max 3.5rem'den 3rem'e çekildi.
        h3: "clamp(1.5rem, 0.8rem + 1.5vw, 3rem)",

        // H4 ("We Create" Metni):
        // Max 2.5rem'den 2rem'e çekildi. TV'de çok bağırmayacak.
        h4: "clamp(1.25rem, 1rem + 0.8vw, 2rem)",

        // Body ("Learn More" ve Menü):
        // Max 1.5rem'den 1.25rem'e çekildi. Çok hafif büyüyecek.
        body: "clamp(1rem, 0.9rem + 0.25vw, 1.25rem)",

        // Small
        small: "clamp(0.8125rem, 0.75rem + 0.15vw, 0.9375rem)",
      },
      spacing: {
        xs: "clamp(0.25rem, 0.2rem + 0.1vw, 0.375rem)",
        sm: "clamp(0.5rem, 0.45rem + 0.2vw, 0.75rem)",
        md: "clamp(0.75rem, 0.65rem + 0.4vw, 1.25rem)",

        // Layout Padding: Kenar boşlukları da aşırı açılmasın diye kısıldı
        layout: "clamp(1.25rem, 1rem + 2vw, 3.5rem)",

        xl: "clamp(2.5rem, 2rem + 2.5vw, 5rem)",
        section: "clamp(4rem, 3rem + 5vw, 10rem)",
      },
    },
  },
  plugins: [],
};
