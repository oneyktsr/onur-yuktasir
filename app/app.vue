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

// --- 1. NATIVE RESTORATION DISABLE ---
// Tarayıcının kendi hafızasını kapatıyoruz ki bizim kontrolümüzle çakışmasın.
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

// --- 2. PROFESSIONAL SCROLL RESET (Sync with Render Cycle) ---
const handleBeforeEnter = () => {
  // A. Native Scroll'u anında sıfırla (Adres çubuğu vs. için)
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }

  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      // B. Smoother'ı geçici olarak durdur (Momentum fiziğini kes)
      smoother.paused(true);

      // C. RequestAnimationFrame (En Profesyonel Dokunuş)
      // Tarayıcıya diyoruz ki: "Tam sayfayı boyamadan önceki o mikrosaniyede scroll'u 0'a eşitle."
      // Bu, CSS silmekten çok daha stabildir çünkü tarayıcının render pipeline'ına girer.
      requestAnimationFrame(() => {
        smoother.scrollTop(0);
      });
    }
  }
};

// --- 3. RE-INIT AFTER TRANSITION ---
const handleAfterEnter = () => {
  if ($ScrollSmoother && $ScrollTrigger) {
    const smoother = ($ScrollSmoother as any).get();

    // Geçiş bitti, fiziği tekrar başlat
    if (smoother) {
      // Bir kare daha bekleyip başlatmak, olası "layout shift" hatalarını önler.
      requestAnimationFrame(() => {
        smoother.paused(false);
        ($ScrollTrigger as any).refresh(); // Ölçümleri al
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
