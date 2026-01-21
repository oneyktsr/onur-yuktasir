<template>
  <NuxtLink
    :to="to"
    class="relative inline-block group overflow-hidden align-middle pb-[4px]"
  >
    <span class="relative z-10 block font-normal leading-none text-body">
      {{ label }}
      <slot />
    </span>

    <span
      class="absolute bottom-0 left-0 w-full h-[1.5px] bg-current transform scale-x-0 transition-transform duration-500 ease-link origin-right group-hover:scale-x-100 group-hover:origin-left"
    ></span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  label?: string;
}>();
</script>

<style scoped>
.ease-link {
  transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
}
</style>
