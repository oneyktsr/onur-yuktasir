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

// --- SCROLL RESTORATION ---
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
        smooth: 1.0,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
        // Mobildeki resize tetiklemelerini yoksay (adres çubuğu için kritik)
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

// --- HARD RESET SCROLL LOGIC ---
const handleBeforeEnter = () => {
  // 1. Tarayıcının kendi scroll'unu zorla sıfırla
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }

  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      // 2. Momentum'u (hızı) anında öldür ve durdur.
      smoother.paused(true);

      // 3. Smoother'ın iç değerini 0 yap.
      smoother.scrollTop(0);

      // 4. İŞTE ATLADIĞIMIZ DETAY (CSS HARD RESET):
      // Smoother'ın elemente bastığı 'transform' stilini tamamen siliyoruz.
      // Bu sayede momentumdan kalan son karedeki kayıklık anında yok olur.
      const content = document.getElementById("smooth-content");
      if (content) {
        content.style.transform = "none";
        content.style.willChange = "auto"; // Performans reset
      }
    }
  }
};

const handleAfterEnter = () => {
  if ($ScrollSmoother && $ScrollTrigger) {
    const smoother = ($ScrollSmoother as any).get();

    // 5. Her şey yüklendi, sistemi tekrar devreye al
    if (smoother) {
      smoother.paused(false);
    }

    // Ölçümleri yenile
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
