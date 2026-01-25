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
  type: { type: String, default: "lines, words" },
});

const textElement = ref<HTMLElement | null>(null);
const { $gsap, $SplitText, $ScrollTrigger } = useNuxtApp();
let splitInstance: any = null;

const isLoaded = useState("isLoaded");

const runAnimation = () => {
  if (!textElement.value) return;

  textElement.value.classList.remove("invisible");

  if (!$SplitText) return;

  try {
    splitInstance = new $SplitText(textElement.value, {
      type: props.type,
      linesClass: "line-wrapper",
      wordsClass: "word-content",
      autoSplit: true,

      onSplit: (self: any) => {
        // --- Lines (Satır) Animasyonu ---
        if (props.type === "lines" || props.type.includes("lines")) {
          self.lines.forEach((line: HTMLElement) => {
            const content = line.innerHTML;
            // line-inner temiz bir div olarak kaldı
            line.innerHTML = `<div class="line-inner">${content}</div>`;
            line.style.overflow = "hidden";
          });

          const targets = self.lines.map((line: HTMLElement) =>
            line.querySelector(".line-inner"),
          );

          return $gsap.from(targets, {
            duration: props.duration,
            yPercent: 100, // %100 aşağıdan gelir
            rotation: 3, // Referans kodda hafif bir rotasyon var (text-line), şıklık katar
            stagger: props.stagger,
            ease: "power4.out",
            delay: props.delay,

            // ScrollTrigger ayarları
            scrollTrigger: {
              trigger: textElement.value,
              start: "top 90%",
              toggleActions: "play none none none",
            },

            // Animasyon bitince GPU yükünü boşalt
            onComplete: () => {
              $gsap.set(targets, { clearProps: "transform,willChange" });
            },
          });
        }
        // --- Words (Kelime) Fallback ---
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
    console.error("TextReveal Error:", err);
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

/* Stil işlemleri main.css üzerinden yönetiliyor (line-wrapper, line-inner) */
/* Burası temiz kalabilir */
</style>
