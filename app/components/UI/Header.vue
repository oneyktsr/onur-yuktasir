<template>
  <header
    class="fixed top-0 left-0 w-full z-[9000] px-layout pt-layout mix-blend-difference text-[#e4e0db] pointer-events-none"
  >
    <div class="grid items-center w-full grid-cols-4 md:grid-cols-12 gap-x-md">
      <div
        class="invisible col-span-2 font-normal leading-none tracking-tight uppercase select-none md:col-span-2 text-h4"
      >
        Le Champ™
      </div>

      <div
        class="col-span-2 col-start-3 text-right pointer-events-auto md:col-start-11 md:col-span-2 lg:hidden"
      >
        <button
          class="tracking-widest uppercase transition-opacity text-small hover:opacity-50"
        >
          Menu
        </button>
      </div>

      <div class="hidden lg:block lg:col-span-4"></div>

      <nav
        class="items-center justify-between hidden leading-none pointer-events-auto lg:flex lg:col-span-3 text-body"
      >
        <NuxtLink to="/studio" class="transition-opacity hover:opacity-50"
          >Studio</NuxtLink
        >
        <NuxtLink to="/works" class="transition-opacity hover:opacity-50"
          >Works</NuxtLink
        >
        <NuxtLink to="/insights" class="transition-opacity hover:opacity-50"
          >Insights</NuxtLink
        >
        <NuxtLink to="/experience" class="transition-opacity hover:opacity-50"
          >Experience</NuxtLink
        >
      </nav>

      <div class="hidden lg:block lg:col-span-2"></div>

      <div
        class="hidden leading-none text-right pointer-events-auto lg:block lg:col-span-1"
      >
        <NuxtLink
          to="/contact"
          class="transition-opacity text-body hover:opacity-50 whitespace-nowrap"
          >Let's Talk</NuxtLink
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header logic
</script>
