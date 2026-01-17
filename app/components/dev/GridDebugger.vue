<template>
  <div
    v-if="showGrid"
    class="fixed inset-0 z-[10000] pointer-events-none flex justify-center w-full h-full"
  >
    <div
      class="grid w-full h-full grid-cols-4 px-layout md:grid-cols-8 lg:grid-cols-12 gap-x-md"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="relative h-full bg-red-500/10 border-x border-red-500/20"
        :class="[
          i > 8
            ? 'hidden lg:block' /* 9-12 arası: Sadece Desktop'ta göster */
            : i > 4
              ? 'hidden md:block' /* 5-8 arası: Tablet ve üzeri göster */
              : 'block' /* 1-4 arası: Hep göster */,
        ]"
      >
        <span
          class="absolute top-2 left-1 text-[10px] text-red-500 font-mono"
          >{{ i }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const showGrid = ref(false);

const toggleGrid = (e: KeyboardEvent) => {
  // Shift + G ile aç/kapa
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    showGrid.value = !showGrid.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", toggleGrid);
});

onUnmounted(() => {
  window.removeEventListener("keydown", toggleGrid);
});
</script>
