<template>
  <div
    ref="preloaderRef"
    class="fixed inset-0 z-[9999] flex flex-col justify-between bg-custom-dark text-[#e4e0db] px-6 py-8"
  >
    <div
      class="flex justify-between w-full text-xs tracking-widest uppercase opacity-50"
    >
      <span>Loading</span>
      <span>Please Wait</span>
    </div>

    <div class="flex items-center justify-center overflow-hidden">
      <h1
        ref="counterRef"
        class="text-[15vw] leading-none font-light tracking-tighter tabular-nums"
      >
        0
      </h1>
      <span class="text-[4vw] self-start mt-4 md:mt-8 opacity-50">%</span>
    </div>

    <div
      class="flex justify-between w-full text-xs tracking-widest uppercase opacity-50"
    >
      <span>Studio © 2026</span>
      <span ref="statusRef">Initializing...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const preloaderRef = ref<HTMLElement | null>(null);
const counterRef = ref<HTMLElement | null>(null);
const statusRef = ref<HTMLElement | null>(null);

const { $gsap } = useNuxtApp();

// GLOBAL KANCA: Sitenin yüklenme durumunu kontrol eden ortak değişken
const isLoaded = useState("isLoaded", () => false);

onMounted(() => {
  const tl = $gsap.timeline({
    onComplete: () => {
      // 1. Animasyon bitince kilidi açıyoruz!
      isLoaded.value = true;

      // 2. Preloader'ı yok et
      if (preloaderRef.value) preloaderRef.value.style.display = "none";
    },
  });

  tl.to(
    counterRef.value,
    {
      innerText: 100,
      duration: 2.5,
      snap: { innerText: 1 },
      ease: "power2.inOut",
      onUpdate: function () {
        if (counterRef.value) {
          counterRef.value.innerHTML = Math.round(
            this.targets()[0].innerText,
          ).toString();
        }
      },
    },
    "start",
  );

  tl.to(
    statusRef.value,
    {
      text: "Assets Loaded",
      duration: 0.5,
      delay: 1.5,
    },
    "start",
  );

  tl.to(preloaderRef.value, {
    yPercent: -100,
    duration: 1.2,
    ease: "power4.inOut",
  });
});
</script>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
