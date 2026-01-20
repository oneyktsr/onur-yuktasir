<template>
  <div class="w-full h-screen bg-[#0d0e13] text-[#e4e0db] overflow-hidden">
    <ClientOnly>
      <div v-if="displayProjects.length > 0" class="w-full h-full">
        <WorksImmersiveGallery :items="displayProjects as any" />
      </div>

      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-[#0d0e13]"
      >
        <span class="text-[#e4e0db] opacity-50 animate-pulse font-light"
          >Loading Gallery...</span
        >
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// 1. Gerçek veriyi çek
const { data: realProjects, pending } = await useAsyncData(
  "works-list-immersive",
  () =>
    queryContent("works")
      .where({ _extension: "md", status: "published" })
      .sort({ id: -1 })
      .find(),
);

// 2. Fallback (Yedek) Projeler
const fallbackProjects = [
  {
    title: "Concept Alpha",
    slug: "concept-alpha",
    cover: { image: "https://picsum.photos/800/800?random=1" },
  },
  {
    title: "Mono Brand",
    slug: "mono-brand",
    cover: { image: "https://picsum.photos/800/800?random=2" },
  },
  {
    title: "Studio X",
    slug: "studio-x",
    cover: { image: "https://picsum.photos/800/800?random=3" },
  },
  {
    title: "Urban Future",
    slug: "urban-future",
    cover: { image: "https://picsum.photos/800/800?random=4" },
  },
  {
    title: "Neon Lights",
    slug: "neon-lights",
    cover: { image: "https://picsum.photos/800/800?random=5" },
  },
];

// 3. Görüntülenecek Veriyi Seç
const displayProjects = computed(() => {
  if (
    realProjects.value &&
    Array.isArray(realProjects.value) &&
    realProjects.value.length > 0
  ) {
    return realProjects.value;
  }
  if (!pending.value) {
    return fallbackProjects;
  }
  return [];
});

useHead({
  title: "Works — Studio",
  meta: [
    // Tema rengini güncelledik: #0d0e13
    { name: "theme-color", content: "#0d0e13" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
  ],
});
</script>
