<template>
  <div class="bg-[#e4e0db] min-h-screen w-full relative">
    <DevGridDebugger />
    <DevStyleGuide />

    <UIHeader />
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

// Sayfa yüklenene kadar native scroll'u gizle
useHead({
  bodyAttrs: {
    class: computed(() =>
      isLoaded.value ? "" : "overflow-hidden h-screen touch-none",
    ),
  },
});

onMounted(() => {
  if (process.client && $ScrollSmoother) {
    try {
      ($ScrollSmoother as any).create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        effects: true,
        normalizeScroll: {
          allowNestedScroll: true,
          debounce: false,
          type: "touch,wheel", // Sadece touch ve tekerlek
        },
        ignoreMobileResize: true,
        // DÜZELTME: 0 yapıldı.
        // Mobilde JS ile yumuşatma yapmaz, native scroll kullanır.
        // Bu sayede takılmalar biter, yağ gibi akar.
        smoothTouch: 0,
      });

      // Başlangıçta duraklat
      if (!isLoaded.value) {
        const smoother = ($ScrollSmoother as any).get();
        if (smoother) smoother.paused(true);
      }
    } catch (error) {
      console.error("ScrollSmoother Create Error:", error);
    }
  }
});

watch(isLoaded, (val) => {
  if (val && $ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) smoother.paused(false);

    // Refresh ile boyutları güncelle
    setTimeout(() => {
      if ($ScrollTrigger) ($ScrollTrigger as any).refresh();
    }, 100);
  }
});
</script>
