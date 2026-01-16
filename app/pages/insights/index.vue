<script setup lang="ts">
// Import satırı YOK

const {
  data: posts,
  pending,
  error,
} = (await useAsyncData("insights-list", () =>
  // @ts-ignore -> queryContent hatasını susturur
  queryContent("/insights").find(),
)) as any; // -> Gelen veriyi 'any' yaparak tip hatasını susturur
</script>

<template>
  <div>
    <h1 class="text-h1 mb-layout">Insights</h1>

    <div v-if="pending" class="opacity-50 text-body">Loading insights...</div>
    <div v-else-if="error" class="text-red-500 text-body">
      Error loading insights.
    </div>

    <div v-else-if="posts && posts.length > 0" class="flex flex-col gap-layout">
      <div
        v-for="post in posts"
        :key="post._path"
        class="border-b border-custom-dark/10 pb-layout"
      >
        <NuxtLink :to="post._path" class="block group">
          <div
            class="flex flex-col justify-between md:flex-row md:items-baseline gap-sm"
          >
            <h2 class="transition-opacity text-h2 group-hover:opacity-60">
              {{ post.title }}
            </h2>
            <span class="font-mono opacity-50 text-small">Read More -></span>
          </div>
          <p class="max-w-2xl text-body opacity-60 mt-sm">
            {{ post.description }}
          </p>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="opacity-50 text-body">No insights found yet.</div>
  </div>
</template>
