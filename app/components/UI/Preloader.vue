<template>
  <div>
    <div
      class="fixed inset-0 z-[10000] px-layout pt-layout w-full h-full pointer-events-none"
      style="mix-blend-mode: difference; color: #e4e0db"
    >
      <div class="grid w-full grid-cols-4 md:grid-cols-12 gap-x-md">
        <div class="flex items-start col-span-2 md:col-span-2">
          <h1
            ref="brandRef"
            class="font-normal leading-none tracking-tight uppercase origin-left opacity-0 text-h4"
          >
            Le Champ™
          </h1>
        </div>
      </div>
    </div>

    <div
      ref="curtainRef"
      class="fixed inset-0 z-[9999] bg-custom-dark text-[#e4e0db] px-layout w-full h-full cursor-wait flex flex-col justify-center"
    >
      <div
        class="grid items-center w-full grid-cols-4 md:grid-cols-12 gap-x-md"
      >
        <div class="col-span-2 md:col-span-2"></div>

        <div
          class="flex col-start-3 col-span-2 md:col-start-4 md:col-span-6 relative h-[1px] overflow-hidden items-center opacity-30"
        >
          <div
            ref="lineRef"
            class="absolute top-0 left-0 h-full w-full bg-[#e4e0db] origin-left scale-x-0"
          ></div>
        </div>

        <div class="hidden text-right md:block md:col-start-12 md:col-span-1">
          <span
            ref="counterRef"
            class="font-normal opacity-0 text-small tabular-nums"
            >0</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const curtainRef = ref<HTMLElement | null>(null);
const brandRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);
const counterRef = ref<HTMLElement | null>(null);

const { $gsap, $SplitText } = useNuxtApp();
const isLoaded = useState("isLoaded");

onMounted(() => {
  if (!$gsap || !$SplitText) return;

  const split = new $SplitText(brandRef.value, { type: "chars" });

  // BAŞLANGIÇ
  $gsap.set(brandRef.value, {
    opacity: 1,
    y: "45vh",
    scale: 1.2,
  });

  $gsap.set(split.chars, { opacity: 0 });
  $gsap.set(counterRef.value, { opacity: 0 });
  $gsap.set(lineRef.value, { transformOrigin: "left center" });

  const tl = $gsap.timeline({
    onComplete: () => {
      isLoaded.value = true;
      if (curtainRef.value) curtainRef.value.style.display = "none";
    },
  });

  // AKIŞ
  tl.to(split.chars, {
    opacity: 1,
    duration: 1.0,
    stagger: { from: "random", amount: 0.8 },
    ease: "power2.out",
  });

  if (counterRef.value) {
    tl.to(counterRef.value, { opacity: 1, duration: 0.5 }, "-=0.5");
  }

  tl.to(
    lineRef.value,
    { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
    "progress",
  );

  if (counterRef.value) {
    tl.to(
      counterRef.value,
      {
        innerText: 100,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: "power2.inOut",
        onUpdate: function () {
          if (counterRef.value)
            counterRef.value.innerText = Math.ceil(
              this.targets()[0].innerText,
            ).toString();
        },
      },
      "progress",
    );
  }

  // ÇIKIŞ
  tl.set(lineRef.value, { transformOrigin: "right center" });
  tl.to(
    lineRef.value,
    { scaleX: 0, duration: 0.6, ease: "power2.inOut" },
    "exit",
  );

  if (counterRef.value) {
    tl.to(
      counterRef.value,
      { opacity: 0, duration: 0.4, ease: "power2.inOut" },
      "exit",
    );
  }

  // --- BÜYÜK FİNAL (HOP EFEKTİ) ---

  // Perde aniden fırlar (Expo)
  tl.to(
    curtainRef.value,
    {
      yPercent: -100,
      duration: 1.5, // Süre biraz uzadı ki eğrinin "bekleme" kısmı hissedilsin
      ease: "expo.inOut", // KESKİN GEÇİŞ
    },
    "reveal",
  );

  // Logo perdeyle senkronize fırlar
  tl.to(
    brandRef.value,
    {
      y: 0,
      scale: 1,
      duration: 1.5, // Perdeyle aynı süre
      ease: "expo.inOut", // Perdeyle aynı eğri (Kritik)
    },
    "reveal",
  );
});
</script>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
