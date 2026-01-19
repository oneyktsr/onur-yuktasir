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
  type: { type: String, default: "lines, words" }, // Varsayılan tip
});

const textElement = ref<HTMLElement | null>(null);
const { $gsap, $SplitText, $ScrollTrigger } = useNuxtApp();
let splitInstance: any = null;

const isLoaded = useState("isLoaded");

const runAnimation = () => {
  if (!textElement.value) return;

  // Başlangıç gizliliğini kaldır
  textElement.value.classList.remove("invisible");

  if (!$SplitText) {
    console.warn("SplitText yüklenemedi, animasyon atlandı.");
    return;
  }

  try {
    splitInstance = new $SplitText(textElement.value, {
      type: props.type,
      linesClass: "line-wrapper", // Maske görevi görecek
      wordsClass: "word-content",
      autoSplit: true,

      onSplit: (self: any) => {
        // Eğer 'lines' kullanıyorsak Mask Reveal Efektini kurgula
        if (props.type === "lines" || props.type.includes("lines")) {
          // 1. Her satırın içeriğini bir wrapper içine al
          self.lines.forEach((line: HTMLElement) => {
            const content = line.innerHTML;
            // İçeriği saran ve hareket edecek olan div
            line.innerHTML = `<div class="line-inner will-change-transform" style="display: block;">${content}</div>`;
            // Satırın kendisi maske olur
            line.style.overflow = "hidden";
          });

          // 2. Animasyonu oluşturulan 'line-inner' elementlerine uygula
          const targets = self.lines.map((line: HTMLElement) =>
            line.querySelector(".line-inner"),
          );

          return $gsap.from(targets, {
            duration: props.duration,
            yPercent: 100, // İçerik %100 aşağıdan gelir
            stagger: props.stagger,
            ease: "power4.out",
            delay: props.delay,
            scrollTrigger: {
              trigger: textElement.value,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }

        // Eğer lines yoksa normal (kelime/harf) animasyon (Fallback)
        else {
          return $gsap.from(self.words || self.chars, {
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
        }
      },
    });

    if ($ScrollTrigger) $ScrollTrigger.refresh();
  } catch (err) {
    console.error("TextReveal Animation Error:", err);
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

/* Maske Ayarları */
:deep(.line-wrapper) {
  /* Satırın kendisi maskedir, taşan içeriği gizler */
  overflow: hidden !important;
  padding-bottom: 0.1em; /* Descender (g, y kuyrukları) payı */
  display: block;
}

:deep(.line-inner) {
  /* Hareket eden parça */
  transform-origin: top left;
}
</style>
