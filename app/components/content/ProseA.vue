<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="text-custom-dark border-b border-custom-dark/30 hover:border-custom-dark transition-colors pb-0.5"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  href: { type: String, default: "" },
  target: { type: String, default: undefined },
});
</script>
