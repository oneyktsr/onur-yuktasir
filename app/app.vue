<template>
  <div class="relative w-full h-full">
    <DevGridDebugger />
    <DevStyleGuide />

    <UIHeader />
    <UIPreloader />

    <div
      id="smooth-wrapper"
      class="transition-opacity duration-1000 ease-out delay-200"
      :class="
        isLoaded
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      "
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

// --- SCROLL RESTORATION FIX ---
onBeforeMount(() => {
  if (typeof window !== "undefined") {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }
});

// Sayfa yüklenene kadar scroll kilitlenir
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

// --- EVENT-DRIVEN SCROLL RESET (Hooks) ---

// 1. Yeni sayfa girmeden HEMEN ÖNCE (Eski sayfa gitmiştir)
const handleBeforeEnter = () => {
  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) {
      // Scroll'u anında tepeye al.
      // Eski sayfa olmadığı ve yeni sayfa henüz opacity-0 olduğu için zıplama görünmez.
      smoother.scrollTop(0);
    }
  }
};

// 2. Yeni sayfa tamamen yüklendiğinde ve animasyonu bittiğinde
const handleAfterEnter = () => {
  // Yeni DOM oturduğu için ölçümleri yenile
  if ($ScrollTrigger) {
    ($ScrollTrigger as any).refresh();
  }
};

// Preloader bittiğinde scroll'u serbest bırak
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
