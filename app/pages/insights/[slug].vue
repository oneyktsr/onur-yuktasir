<template>
  <article class="max-w-3xl mx-auto">
    <ContentDoc>
      <template #default="{ doc }">
        <header class="text-center mb-xl">
          <span
            class="inline-block px-2 py-1 font-mono rounded-full text-small bg-custom-dark text-custom-light mb-md"
            >Insight</span
          >
          <h1 class="text-h1 mb-md">{{ doc.title }}</h1>
        </header>

        <ContentRenderer :value="doc" />
      </template>

      <template #not-found>
        <h1>Insight not found.</h1>
      </template>
    </ContentDoc>
  </article>
</template>
