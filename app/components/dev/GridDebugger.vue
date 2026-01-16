<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex flex-col w-screen h-screen pointer-events-none p-md"
  >
    <div
      class="relative grid w-full h-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-sm"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="w-full h-full bg-red-500/10 border-x border-red-500/20"
        :class="{
          'hidden md:block': i > 4 && i <= 8,
          'hidden lg:block': i > 8,
        }"
      >
        <div class="text-[10px] text-red-500 text-center mt-2 opacity-50">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref(false);

const toggleGrid = (event: KeyboardEvent) => {
  if (event.shiftKey && (event.key === "G" || event.key === "g")) {
    isVisible.value = !isVisible.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", toggleGrid);
});

onUnmounted(() => {
  window.removeEventListener("keydown", toggleGrid);
});
</script>
