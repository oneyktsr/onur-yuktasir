<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center gap-3 align-middle cursor-pointer select-none group"
  >
    <div
      class="relative w-2 h-2 transition-all duration-500 ease-flow group-hover:w-8"
    >
      <span
        class="absolute block w-2 h-2 transition-all duration-500 -translate-x-1/2 -translate-y-1/2 border border-current rounded-full top-1/2 left-1/2 opacity-40 ease-flow group-hover:w-8 group-hover:h-8 group-hover:bg-current group-hover:opacity-100"
      ></span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="absolute top-1/2 left-1/2 w-3 h-3 -translate-y-1/2 opacity-0 transition-all duration-500 ease-flow -translate-x-[150%] group-hover:opacity-100 group-hover:-translate-x-1/2"
        :class="mode === 'dark' ? 'text-custom-dark' : 'text-[#e4e0db]'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>

    <div class="relative overflow-hidden pb-[4px]">
      <span class="block font-normal leading-none text-body">
        {{ label }}
        <slot />
      </span>

      <span
        class="absolute bottom-0 left-0 w-full h-[1.5px] bg-current transform origin-right transition-transform duration-500 ease-flow scale-x-100 group-hover:scale-x-0"
      ></span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string;
  label?: string;
  mode?: "light" | "dark";
}

withDefaults(defineProps<Props>(), {
  mode: "light",
});
</script>

<style scoped>
/* FLOW Easing (Navbar ile Aynı)
  "Yavaş Başla -> Hızlan -> Yavaş Bitir"
  cubic-bezier(0.76, 0, 0.24, 1)
  Bu değer, "Expo" veya "Quart" ease-in-out eğrisine çok yakındır.
*/
.ease-flow {
  transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
}
</style>
