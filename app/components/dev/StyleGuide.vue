<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[10000] bg-custom-light/95 backdrop-blur-sm p-4 md:p-10 overflow-y-auto text-custom-dark border-4 border-custom-dark"
  >
    <button
      @click="isVisible = false"
      class="absolute font-bold top-5 right-5 text-h4 hover:opacity-50"
    >
      [X] KAPAT (Shift + S)
    </button>

    <div class="max-w-6xl pt-10 mx-auto space-y-16 md:pt-0">
      <div class="pb-4 border-b border-custom-dark">
        <h2 class="font-normal text-h2">Proje Style Guide (v2)</h2>
        <p class="font-light text-body opacity-70">
          Tüm tipografi, boşluklar ve UI elemanları.
        </p>
      </div>

      <section class="space-y-8">
        <h3
          class="pb-2 font-normal tracking-wider uppercase border-b text-h3 border-custom-dark/20"
        >
          1. Tipografi (Full Set)
        </h3>
        <div class="grid gap-8 md:gap-12">
          <div
            v-for="(font, index) in typography"
            :key="index"
            class="flex flex-col gap-4 pb-8 border-b md:flex-row md:items-start border-custom-dark/10 last:border-0"
          >
            <div class="w-48 pt-2 shrink-0">
              <span
                class="px-2 py-1 font-mono rounded text-small bg-custom-dark text-custom-light"
              >
                .{{ font.class }}
              </span>
              <p class="mt-2 text-small opacity-60">{{ font.desc }}</p>
            </div>
            <div class="flex-1 space-y-4">
              <div :class="font.class" class="font-normal break-words">
                {{ font.sample }}
                <span class="ml-2 opacity-40 text-small">(Normal / 250)</span>
              </div>
              <div
                :class="font.class"
                class="font-light break-words opacity-80"
              >
                {{ font.sample }}
                <span class="ml-2 opacity-40 text-small">(Light / 200)</span>
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
              class="relative flex items-center justify-center h-32 border-2 bg-custom-light border-custom-dark"
            >
              <span class="font-normal text-custom-dark text-h4">Light Bg</span>
              <span class="absolute opacity-50 bottom-2 right-2 text-small"
                >#e4e0db</span
              >
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="relative flex items-center justify-center h-32 border-2 bg-custom-dark border-custom-light"
            >
              <span class="font-normal text-custom-light text-h4">Dark Bg</span>
              <span
                class="absolute opacity-50 bottom-2 right-2 text-small text-custom-light"
                >#0d0e13</span
              >
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-8">
        <h3
          class="pb-2 font-normal tracking-wider uppercase border-b text-h3 border-custom-dark/20"
        >
          3. Spacing / Boşluklar
        </h3>
        <div class="space-y-6">
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
              class="h-8 bg-custom-dark flex items-center justify-center text-custom-light text-[10px] px-2 min-w-[3rem]"
            >
              {{ space.pixel }}
            </div>
          </div>
        </div>
      </section>

      <section class="pb-20 space-y-8">
        <h3
          class="pb-2 font-normal tracking-wider uppercase border-b text-h3 border-custom-dark/20"
        >
          4. UI Elements (Buttons & Inputs)
        </h3>
        <div class="grid gap-12 md:grid-cols-2">
          <div class="space-y-6">
            <p class="opacity-50 text-body">Buttons</p>
            <div class="flex flex-col items-start gap-4">
              <button
                class="px-8 py-3 font-normal tracking-wider uppercase transition-colors duration-300 border border-custom-dark text-custom-dark hover:bg-custom-dark hover:text-custom-light text-small"
              >
                Primary Button
              </button>
              <button
                class="px-0 py-1 font-normal tracking-wider uppercase transition-opacity duration-300 border-b border-custom-dark text-custom-dark hover:opacity-50 text-small"
              >
                Text Link Button
              </button>
              <div class="flex gap-4">
                <button
                  class="flex items-center justify-center w-12 h-12 transition-colors duration-300 border rounded-full border-custom-dark text-custom-dark hover:bg-custom-dark hover:text-custom-light"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <p class="opacity-50 text-body">Form Inputs</p>
            <div class="max-w-sm space-y-4">
              <input
                type="text"
                placeholder="Input Placeholder"
                class="w-full py-4 font-light transition-colors bg-transparent border-b border-custom-dark/30 text-body focus:outline-none focus:border-custom-dark placeholder:opacity-40"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);

// GÜNCELLENMİŞ TİPOGRAFİ LİSTESİ (H3, H4, Small Eklendi)
const typography = [
  { class: "text-display", desc: "Hero / Display", sample: "Display Hero" },
  { class: "text-h1", desc: "H1 Sayfa Başlığı", sample: "H1 Başlık" },
  { class: "text-h2", desc: "H2 Bölüm Başlığı", sample: "H2 Alt Başlık" },
  { class: "text-h3", desc: "H3 Alt Başlık", sample: "H3 Konu Başlığı" }, // YENİ
  { class: "text-h4", desc: "H4 / Button Text", sample: "H4 Detay Başlık" }, // YENİ
  {
    class: "text-body",
    desc: "Body Metin",
    sample: "Body text paragraf alanı.",
  },
  { class: "text-small", desc: "Small / Meta", sample: "Small detay metni." }, // YENİ
];

const spaces = [
  { name: "xs", class: "w-xs", pixel: "4px -> 6px", desc: "Micro Gap" },
  { name: "sm", class: "w-sm", pixel: "8px -> 12px", desc: "Small Gap" },
  { name: "md", class: "w-md", pixel: "12px -> 16px", desc: "GRID GUTTER" },
  {
    name: "layout",
    class: "w-layout",
    pixel: "20px -> 32px",
    desc: "PAGE PADDING",
  },
  { name: "xl", class: "w-xl", pixel: "40px -> 64px", desc: "Component Pad" },
  {
    name: "section",
    class: "w-section",
    pixel: "64px -> 144px",
    desc: "Section Margin",
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
