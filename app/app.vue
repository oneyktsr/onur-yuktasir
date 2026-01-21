<template>
  <div class="bg-[#e4e0db] min-h-screen w-full relative">
    <DevGridDebugger />
    <DevStyleGuide />

    <UIHeader />
    <UIPreloader />

    <div
      id="smooth-wrapper"
      class="transition-opacity duration-700 ease-out"
      :class="isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'"
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
// GÜNCELLEME: onBeforeMount eklendi
import { watch, nextTick, onMounted, computed, onBeforeMount } from "vue";

const isLoaded = useState<boolean>("isLoaded", () => false);
const { $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

// --- SCROLL RESTORATION FIX (YENİ EKLENEN KISIM) ---
// Sayfa yenilendiğinde tarayıcının aşağıdan başlatmasını engeller ve en tepeye zorlar.
onBeforeMount(() => {
  if (typeof window !== "undefined") {
    // 1. Tarayıcının otomatik kaydırma hafızasını kapat
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    // 2. Sayfayı en tepeye (0,0) noktasına zorla
    window.scrollTo(0, 0);
  }
});

// Sayfa yüklenene kadar scroll kilitlenir
useHead({
  bodyAttrs: {
    class: computed(() =>
      isLoaded.value ? "" : "overflow-hidden h-screen touch-none",
    ),
  },
});

onMounted(() => {
  if (process.client && $ScrollSmoother) {
    try {
      ($ScrollSmoother as any).create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0, // Masaüstü yumuşatma süresi (1 saniye)
        effects: true, // Parallax efektlerini (data-speed) aktif eder

        // --- MOBİL AYARLARI ---
        // 0.1 değeri mobilde "native" hissi verirken arka planda
        // GSAP hesaplamalarının (parallax vb.) akıcı çalışmasını sağlar.
        smoothTouch: 0.1,

        // Mobil tarayıcıların adres çubuğu gizlenmesi/yenilenmesi
        // sırasındaki zıplamaları önlemek için normalize ayarları
        normalizeScroll: {
          allowNestedScroll: true,
          debounce: true,
          type: "touch,wheel",
        },

        ignoreMobileResize: true, // Klavye açılınca hesaplamaları bozma
      });

      // Yükleme bitmediyse scroll'u durdur
      if (!isLoaded.value) {
        const smoother = ($ScrollSmoother as any).get();
        if (smoother) smoother.paused(true);
      }
    } catch (error) {
      console.error("ScrollSmoother Create Error:", error);
    }
  }
});

// Preloader bittiğinde scroll'u serbest bırak
watch(isLoaded, (val) => {
  if (val && $ScrollSmoother) {
    const smoother = ($ScrollSmoother as any).get();
    if (smoother) smoother.paused(false);

    // DOM tam oturduktan sonra ScrollTrigger'ı yenile
    // Parallax hesaplamalarının kaymaması için ufak bir gecikme iyidir.
    setTimeout(() => {
      if ($ScrollTrigger) ($ScrollTrigger as any).refresh();
    }, 500);
  }
});
</script>
