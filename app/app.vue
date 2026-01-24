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

// --- NATIVE SCROLL DISABLE ---
onBeforeMount(() => {
  if (typeof window !== "undefined") {
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
        // PREMIUM AYARLAR:
        smooth: 1.1, // 1.0 yerine 1.1 bir tık daha "ağır/lüks" hissettirir.
        effects: true,
        smoothTouch: 0.1, // Mobilde çok az yumuşatma (gecikme hissini önler)

        // --- KRİTİK NOKTA: Normalize Scroll ---
        // Bu ayar tarayıcı ile JS savaşını bitirir.
        normalizeScroll: true,

        // Klavye açılınca veya adres bar değişince hesap yapmayı keser (Performans)
        ignoreMobileResize: true,
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

// --- PROFESSIONAL SCROLL RESET (Önceki Adımdaki Kod) ---
const handleBeforeEnter = () => {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }

  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      smoother.paused(true);
      requestAnimationFrame(() => {
        smoother.scrollTop(0);
      });
    }
  }
};

const handleAfterEnter = () => {
  if ($ScrollSmoother && $ScrollTrigger) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      requestAnimationFrame(() => {
        smoother.paused(false);
        ($ScrollTrigger as any).refresh();
      });
    }
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
