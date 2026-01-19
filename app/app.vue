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

// Lazer için eklenen 'route' ve 'gsap' referansları temizlendi.

useHead({
  bodyAttrs: {
    class: computed(() =>
      isLoaded.value ? "" : "overflow-hidden h-screen touch-none",
    ),
  },
});

onMounted(() => {
  if ($ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) smoother.paused(true);
  }
});

watch(isLoaded, async (newVal) => {
  if (newVal) {
    await nextTick();
    if ($ScrollTrigger) ($ScrollTrigger as any).refresh();
    if ($ScrollSmoother) {
      const smoother = ($ScrollSmoother as any).get();
      if (smoother) smoother.paused(false);
    }
  }
});
</script>
