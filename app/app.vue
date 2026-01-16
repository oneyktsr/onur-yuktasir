<template>
  <div>
    <UIPreloader v-if="!isLoaded" />

    <div
      id="smooth-wrapper"
      class="transition-opacity duration-700 ease-out"
      :class="!isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <div id="smooth-content">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Global state'i buradan da okuyabiliriz
const isLoaded = useState("isLoaded");
</script>
