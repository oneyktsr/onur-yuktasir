<template>
  <div class="bg-[#e4e0db] min-h-screen w-full relative">
    <DevGridDebugger />
    <DevStyleGuide />

    <UIPreloader />

    <div
      id="smooth-wrapper"
      class="transition-opacity duration-700 ease-out"
      :class="isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <div id="smooth-content">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick, onMounted, computed } from "vue";

const isLoaded = useState<boolean>("isLoaded", () => false);
const { $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

// 1. CSS SCROLL KİLİDİ (Native & Mobil)
// isLoaded FALSE iken (Preloader var): body kilitlenir.
// isLoaded TRUE olunca (Site açılınca): kilit kalkar.
useHead({
  bodyAttrs: {
    class: computed(() =>
      isLoaded.value ? "" : "overflow-hidden h-screen touch-none",
    ),
  },
});

// 2. GSAP SCROLLSMOOTHER KİLİDİ
onMounted(() => {
  // Sayfa ilk açıldığında Smoother'ı DURDUR.
  // Not: ScrollSmoother instance'ını yakalamak için .get() kullanıyoruz.
  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) smoother.paused(true);
  }
});

watch(isLoaded, async (newVal) => {
  if (newVal) {
    // Preloader bittiğinde:
    await nextTick();

    // a) ScrollTrigger'ı yenile (Konumları tekrar hesapla)
    if ($ScrollTrigger) ($ScrollTrigger as any).refresh();

    // b) ScrollSmoother'ı BAŞLAT (Kilidi aç)
    if ($ScrollSmoother) {
      const smoother = ($ScrollSmoother as any).get();
      if (smoother) smoother.paused(false);
    }
  }
});
</script>
