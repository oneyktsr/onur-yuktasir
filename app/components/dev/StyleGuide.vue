<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[60] bg-custom-light/95 backdrop-blur-sm p-10 overflow-y-auto text-custom-dark border-4 border-custom-dark"
  >
    <button
      @click="isVisible = false"
      class="absolute font-bold top-5 right-5 text-h4 hover:opacity-50"
    >
      [X] KAPAT (Shift + S)
    </button>

    <div class="max-w-6xl mx-auto space-y-16">
      <div class="pb-4 border-b border-custom-dark">
        <h2 class="font-normal text-h2">Proje Style Guide</h2>
        <p class="font-light text-body opacity-70">
          Tasarım sistemi referans kartı.
        </p>
      </div>

      <section class="space-y-8">
        <h3
          class="pb-2 font-normal tracking-wider uppercase border-b text-h3 border-custom-dark/20"
        >
          1. Tipografi (Fluid & Weights)
        </h3>
        <div class="grid gap-12">
          <div
            v-for="(font, index) in typography"
            :key="index"
            class="flex flex-col gap-6 pb-8 border-b md:flex-row md:items-start border-custom-dark/10 last:border-0"
          >
            <div class="w-48 pt-2 shrink-0">
              <span
                class="px-2 py-1 font-mono rounded text-small bg-custom-dark text-custom-light"
                >.{{ font.class }}</span
              >
              <p class="mt-2 text-small opacity-60">{{ font.desc }}</p>
            </div>
            <div class="flex-1 space-y-4">
              <div :class="font.class" class="font-light break-words">
                {{ font.sample }}
                <span class="ml-2 font-mono text-small opacity-40"
                  >(Light 300)</span
                >
              </div>
              <div :class="font.class" class="font-normal break-words">
                {{ font.sample }}
                <span class="ml-2 font-mono text-small opacity-40"
                  >(Regular 400)</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-8">
        <h3
          class="pb-2 font-normal tracking-wider uppercase border-b text-h3 border-custom-dark/20"
        >
          2. Renk Paleti
        </h3>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div class="space-y-2">
            <div
              class="relative flex items-center justify-center h-32 border-2 bg-custom-light border-custom-dark group"
            >
              <span class="font-normal text-custom-dark text-h4">Light Bg</span>
              <span class="absolute opacity-50 bottom-2 right-2 text-small"
                >#e4e0db</span
              >
            </div>
            <div class="flex justify-between font-mono text-body">
              <span>.bg-custom-light</span>
              <span>.text-custom-light</span>
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="relative flex items-center justify-center h-32 border-2 bg-custom-dark border-custom-light group"
            >
              <span class="font-normal text-custom-light text-h4">Dark Bg</span>
              <span
                class="absolute opacity-50 bottom-2 right-2 text-small text-custom-light"
                >#0d0e13</span
              >
            </div>
            <div class="flex justify-between font-mono text-body">
              <span>.bg-custom-dark</span>
              <span>.text-custom-dark</span>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-20 space-y-8">
        <h3
          class="pb-2 font-normal tracking-wider uppercase border-b text-h3 border-custom-dark/20"
        >
          3. Spacing / Boşluklar (Fluid)
        </h3>
        <div class="space-y-6">
          <p class="text-body opacity-70">
            Mobil -> Masaüstü arasında büyüyen boşluk değerleri (Clamp).
          </p>

          <div
            v-for="(space, index) in spaces"
            :key="index"
            class="flex items-center gap-6"
          >
            <div class="w-64 font-mono text-right shrink-0 text-small">
              <span class="font-bold">{{ space.name }}</span
              ><br />
              <span class="opacity-50 text-[10px]">{{ space.desc }}</span>
            </div>
            <div
              :class="space.class"
              class="h-8 bg-custom-dark flex items-center justify-center text-custom-light text-[10px] whitespace-nowrap overflow-hidden px-2"
            >
              {{ space.pixel }}
            </div>
            <div class="text-[10px] font-mono opacity-50">
              *-{{ space.name }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref(false);

const typography = [
  {
    class: "text-display",
    desc: "44px -> 80px",
    sample: "Display Hero Başlık",
  },
  { class: "text-h1", desc: "36px -> 64px", sample: "H1 Sayfa Başlığı" },
  { class: "text-h2", desc: "28px -> 48px", sample: "H2 Bölüm Başlığı" },
  { class: "text-h3", desc: "24px -> 36px", sample: "H3 Kategori Başlığı" },
  { class: "text-h4", desc: "20px -> 28px", sample: "H4 Vurgu Alanları" },
  { class: "text-body", desc: "16px -> 18px", sample: "Body metin alanı." },
  {
    class: "text-small",
    desc: "13px -> 15px",
    sample: "Small / Etiket / Tarih.",
  },
];

// GÜNCELLEME: Section, Layout ve Gutter tanımları netleştirildi.
const spaces = [
  {
    name: "xs",
    class: "w-xs",
    pixel: "4px-8px",
    desc: "Micro / İkon-Text Arası",
  },
  {
    name: "sm",
    class: "w-sm",
    pixel: "12px-16px",
    desc: "GRID GUTTER (Sütun Aralığı)",
  },
  {
    name: "md",
    class: "w-md",
    pixel: "20px-32px",
    desc: "CONTAINER PADDING (Kenar Boşluğu)",
  },
  {
    name: "layout",
    class: "w-layout",
    pixel: "40px-64px",
    desc: "COMPONENT GAP (Bloklar Arası)",
  },
  {
    name: "xl",
    class: "w-xl",
    pixel: "64px-100px",
    desc: "SECTION PADDING (İç Dolgu)",
  },
  {
    name: "section",
    class: "w-section",
    pixel: "100px-180px",
    desc: "SECTION MARGIN (Dış Ayrım)",
  },
];

const toggleGuide = (event: KeyboardEvent) => {
  if (event.shiftKey && (event.key === "S" || event.key === "s")) {
    isVisible.value = !isVisible.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", toggleGuide);
});

onUnmounted(() => {
  window.removeEventListener("keydown", toggleGuide);
});
</script>
