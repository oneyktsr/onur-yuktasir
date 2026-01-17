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

const isLoaded = useState("isLoaded");

const runAnimation = () => {
  if (!textElement.value) return;

  // DÜZELTME 2: Görünmezliği EN BAŞTA kaldır.
  // Böylece aşağıdaki kodlarda hata olsa bile metin görünür.
  textElement.value.classList.remove("invisible");

  // DÜZELTME 3: SplitText yoksa işlemi burada bitir (Metin zaten görünür oldu)
  if (!$SplitText) {
    console.warn("SplitText yüklenemedi, animasyon atlandı.");
    return;
  }

  try {
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

    if ($ScrollTrigger) $ScrollTrigger.refresh();
  } catch (err) {
    console.error("TextReveal Animation Error:", err);
    // Hata olsa bile metin görünsün (Garanti)
    textElement.value.classList.remove("invisible");
  }
};

onMounted(() => {
  document.fonts.ready.then(() => {
    if (isLoaded.value) {
      runAnimation();
    } else {
      const unwatch = watch(isLoaded, (newVal) => {
        if (newVal) {
          runAnimation();
          unwatch();
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
