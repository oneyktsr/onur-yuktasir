<template>
  <div class="relative w-full h-full">
    <DevGridDebugger />
    <DevStyleGuide />
    <UIHeader />
    <UIPreloader />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <NuxtLayout>
          <NuxtPage
            :transition="{
              name: 'page',
              mode: 'out-in',
              onBeforeLeave: onBeforeLeave,
              onAfterEnter: onAfterEnter,
            }"
          />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, watch } from "vue";

const isLoaded = useState<boolean>("isLoaded", () => false);
const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();
let smoother: any;

// 1. Tarayıcı hafızasındaki scroll pozisyonunu sıfırla
onBeforeMount(() => {
  if (import.meta.client) {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }
});

// 2. Smoother Kurulumu
onMounted(() => {
  if (import.meta.client && $ScrollSmoother) {
    // Varsa eskisini temizle (HMR desteği için)
    const existing = ($ScrollSmoother as any).get();
    if (existing) existing.kill();

    smoother = ($ScrollSmoother as any).create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.0, // Masaüstü için ideal
      effects: true,
      smoothTouch: 0.1, // Mobilde hafif bir yumuşatma
      normalizeScroll: true, // Mobil scroll hatalarını önler (Kilitlenmeyi çözer)
      ignoreMobileResize: true,
    });

    // BAŞLANGIÇ KONTROLÜ (Kilitlenmeyi önleyen asıl yer)
    // Eğer sayfa yüklü değilse durdur, yüklüyse başlat.
    // Sadece watcher'a güvenme!
    smoother.paused(!isLoaded.value);
  }
});

// 3. Preloader Bittiğinde
watch(isLoaded, (val) => {
  if (!smoother) return;

  if (val) {
    smoother.paused(false);
    // Animasyonların doğru yerden başlaması için refresh şart
    setTimeout(() => {
      ($ScrollTrigger as any).refresh();
    }, 100);
  } else {
    smoother.paused(true);
  }
});

// 4. Sayfa Geçiş Yönetimi
const onBeforeLeave = () => {
  if (smoother) {
    smoother.paused(true); // Geçiş animasyonu sırasında scroll'u kilitle
  }
};

const onAfterEnter = () => {
  if (!smoother) return;

  // Yeni sayfa içeriği render edildi, scroll'u en başa al
  smoother.scrollTop(0);

  // DOM'un oturması için 2 frame bekle
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      smoother.paused(false); // Kilidi aç
      ($ScrollTrigger as any).refresh(); // Tüm animasyonları yeniden hesapla
    });
  });
};
</script>
