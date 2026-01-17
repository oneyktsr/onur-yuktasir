<template>
  <div>
    <DevGridDebugger />
    <DevStyleGuide />

    <UIPreloader v-if="!isLoaded" />

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
import { watch, nextTick } from "vue";

// DÜZELTME 1: Başlangıç değeri (() => false) vererek undefined olmasını engelle
const isLoaded = useState<boolean>("isLoaded", () => false);
const { $ScrollTrigger } = useNuxtApp();

watch(isLoaded, async (newVal) => {
  if (newVal) {
    await nextTick();
    if ($ScrollTrigger) $ScrollTrigger.refresh();
  }
});
</script>
