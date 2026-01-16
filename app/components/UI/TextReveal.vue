<template>
  <component :is="tag" ref="textElement" class="invisible split-text-wrapper">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  tag: { type: String, default: "div" },
  duration: { type: Number, default: 1.0 },
  stagger: { type: Number, default: 0.1 },
  delay: { type: Number, default: 0 },
});

const textElement = ref<HTMLElement | null>(null);
const { $gsap, $SplitText, $ScrollTrigger } = useNuxtApp();
let splitInstance: any = null;

// Global Yüklenme Durumunu Dinle
const isLoaded = useState("isLoaded");

// Animasyon Fonksiyonu (Sadece zamanı gelince çalışacak)
const runAnimation = () => {
  if (!textElement.value || !$SplitText) return;

  // Görünürlüğü aç
  textElement.value.classList.remove("invisible");

  // SplitText Kurulumu
  splitInstance = new $SplitText(textElement.value, {
    type: "lines, words",
    linesClass: "line-wrapper overflow-hidden",
    wordsClass: "word-content will-change-transform",
    autoSplit: true,
    mask: "lines",

    onSplit: (self: any) => {
      return $gsap.from(self.words, {
        duration: props.duration,
        yPercent: 100,
        autoAlpha: 0,
        stagger: props.stagger,
        ease: "power4.out",
        delay: props.delay,
        scrollTrigger: {
          trigger: textElement.value,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
  });

  // DOM yerleşimi değiştiği için ScrollTrigger'ı tazele
  $ScrollTrigger.refresh();
};

onMounted(() => {
  document.fonts.ready.then(() => {
    // EĞER: Sayfa zaten yüklüyse (örn: sayfalar arası geçiş) -> Hemen çalıştır
    if (isLoaded.value) {
      runAnimation();
    }
    // EĞER: İlk açılışsa ve Preloader varsa -> Bitmesini bekle (Watch)
    else {
      const unwatch = watch(isLoaded, (newVal) => {
        if (newVal) {
          // Preloader bittiği an, animasyon başlasın ama preloader perdesi tamamen kalksın diye
          // ufak bir gecikme (300ms) verebiliriz.
          setTimeout(() => {
            runAnimation();
          }, 300);
          unwatch(); // Dinlemeyi bırak
        }
      });
    }
  });
});

onUnmounted(() => {
  if (splitInstance) splitInstance.revert();
});
</script>

<style scoped>
.invisible {
  visibility: hidden;
}
:deep(.line-wrapper) {
  padding-bottom: 0.05em;
}
</style>
