<template>
  <div class="relative w-full h-full">
    <DevGridDebugger />
    <DevStyleGuide />

    <UIHeader />
    <UIPreloader />

    <div
      id="smooth-wrapper"
      :class="isLoaded ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <div id="smooth-content">
        <NuxtLayout>
          <NuxtPage
            :transition="{
              name: 'page',
              mode: 'out-in',
              onBeforeEnter: handleBeforeEnter,
              onAfterEnter: handleAfterEnter,
            }"
          />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, computed, onBeforeMount } from "vue";

const isLoaded = useState<boolean>("isLoaded", () => false);
const { $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

// --- SCROLL RESTORATION (Tarayıcı hafızasını iptal et) ---
onBeforeMount(() => {
  if (typeof window !== "undefined") {
    // Tarayıcının "kaldığın yerden devam et" özelliğini kapatıyoruz.
    // Bu, mobildeki kaymaların bir numaralı sebebidir.
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }
});

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
      const existing = ($ScrollSmoother as any).get();
      if (existing) existing.kill();

      ($ScrollSmoother as any).create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
        ignoreMobileResize: true, // Mobilde resize tetiklenmesini yoksay (adres çubuğu için)
      });

      if (!isLoaded.value) {
        const smoother = ($ScrollSmoother as any).get();
        if (smoother) smoother.paused(true);
      }
    } catch (error) {
      console.error("ScrollSmoother Create Error:", error);
    }
  }
});

// --- MOBİL UYUMLU SCROLL RESET ---
const handleBeforeEnter = () => {
  // 1. Native (Gerçek) Scroll'u Sıfırla
  // Mobilde adres çubuğu yüzünden oluşan boşluğu burası kapatır.
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }

  // 2. Sanal (Smoother) Scroll'u Sıfırla
  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      smoother.scrollTop(0);
      // Olası momentumu (hızı) sıfırlamak için anlık durdurup başlat
      smoother.paused(true);
      requestAnimationFrame(() => smoother.paused(false));
    }
  }
};

const handleAfterEnter = () => {
  // DOM oturduktan sonra ScrollTrigger ölçümlerini yenile
  if ($ScrollTrigger) {
    ($ScrollTrigger as any).refresh();
  }
};

watch(isLoaded, (val) => {
  if (val && $ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      smoother.paused(false);
    }

    setTimeout(() => {
      if ($ScrollTrigger) ($ScrollTrigger as any).refresh();
    }, 500);
  }
});
</script>
