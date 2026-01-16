<script setup lang="ts">
// Import satırı YOK (Nuxt otomatik halleder)

const {
  data: works,
  pending,
  error,
} = (await useAsyncData("works-list", () =>
  // @ts-ignore -> queryContent hatasını susturur
  queryContent("/works").find(),
)) as any; // -> Gelen veriyi 'any' yaparak .length hatasını susturur
</script>

<template>
  <div>
    <h1 class="text-h1 mb-layout">Selected Works</h1>

    <div v-if="pending" class="opacity-50 text-body">Loading works...</div>
    <div v-else-if="error" class="text-red-500 text-body">
      Error loading projects.
    </div>

    <div
      v-else-if="works && works.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-md"
    >
      <div v-for="work in works" :key="work._path" class="group">
        <NuxtLink :to="work._path" class="block">
          <div
            class="flex items-center justify-center transition-colors bg-custom-dark/5 aspect-video mb-sm group-hover:bg-custom-dark/10 text-small opacity-30"
          >
            Image Placeholder
          </div>
          <h2 class="font-normal text-h3">{{ work.title }}</h2>
          <p class="text-body opacity-60 mt-xs">{{ work.description }}</p>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="opacity-50 text-body">No projects found.</div>
  </div>
</template>
