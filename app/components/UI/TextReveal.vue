<template>
  <component :is="tag" ref="textElement" class="invisible split-text-wrapper">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  tag: { type: String, default: "div" },
  duration: { type: Number, default: 1.0 },
  stagger: { type: Number, default: 0.1 },
  delay: { type: Number, default: 0 },
});

const textElement = ref<HTMLElement | null>(null);
const { $gsap, $SplitText } = useNuxtApp();
let splitInstance: any = null;

onMounted(() => {
  if (!textElement.value || !$SplitText) return;

  document.fonts.ready.then(() => {
    textElement.value?.classList.remove("invisible");

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
