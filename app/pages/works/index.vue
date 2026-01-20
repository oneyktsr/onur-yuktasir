<template>
  <div class="w-full min-h-screen bg-[#e4e0db] text-custom-dark">
    <section
      class="w-full px-layout pt-[calc(theme('spacing.layout')*4)] pb-section"
    >
      <div class="grid grid-cols-4 md:grid-cols-12 gap-x-md">
        <div class="col-span-4 md:col-span-10">
          <div class="relative inline-flex items-start">
            <UITextReveal
              tag="h1"
              type="lines"
              class="text-display font-normal leading-[0.8] tracking-tighter"
            >
              Works
            </UITextReveal>

            <span
              class="ml-2 -mt-2 font-light transition-opacity duration-700 delay-500 opacity-50 text-h3 md:text-h2 md:-mt-4"
              :class="pending ? 'opacity-0' : 'opacity-50'"
            >
              ({{ totalCount }})
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Eğer 'queryContent' hatası editörde devam ederse terminalde: npx nuxi prepare çalıştır.

const { data: projects, pending } = await useAsyncData("works-list-count", () =>
  queryContent("works").where({ _extension: "md" }).only(["_path"]).find(),
);

// DÜZELTME: TypeScript'in 'length' özelliğini görebilmesi için tip kontrolü (Array.isArray) ekledik.
const totalCount = computed(() => {
  const list = projects.value;
  return Array.isArray(list) ? list.length : 0;
});

useHead({
  title: "Works — Studio",
  meta: [{ name: "description", content: "Selected works and case studies." }],
});
</script>
