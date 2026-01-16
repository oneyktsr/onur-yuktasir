<template>
  <article class="max-w-4xl">
    <ContentDoc>
      <template #default="{ doc }">
        <header class="mb-xl">
          <h1 class="text-display mb-md">{{ doc.title }}</h1>
          <p class="font-light text-h3 opacity-60">{{ doc.description }}</p>
        </header>

        <ContentRenderer :value="doc" />
      </template>

      <template #not-found>
        <h1 class="text-h1">Project not found.</h1>
      </template>
    </ContentDoc>
  </article>
</template>
