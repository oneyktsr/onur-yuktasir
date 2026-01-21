<template>
  <div>
    <header
      ref="headerRef"
      class="fixed top-0 left-0 w-full z-[9000] px-layout pt-layout mix-blend-difference text-[#e4e0db] pointer-events-none"
    >
      <div class="grid items-start w-full grid-cols-4 md:grid-cols-12 gap-x-md">
        <div class="col-span-2 md:col-span-2"></div>

        <div
          class="flex justify-end col-span-2 col-start-3 text-right pointer-events-auto md:col-start-11 md:col-span-2 lg:hidden"
        >
          <button
            @click="toggleMenu"
            class="flex flex-col justify-center items-end gap-[4px] w-20 h-6 transition-opacity hover:opacity-50 group"
            aria-label="Toggle Menu"
          >
            <span
              ref="topLine"
              class="block w-12 h-[1px] bg-current origin-center will-change-transform"
            ></span>

            <span
              ref="bottomLine"
              class="block w-12 h-[1px] bg-current origin-center will-change-transform"
            ></span>
          </button>
        </div>

        <div class="hidden lg:block lg:col-span-5"></div>

        <nav
          class="items-center justify-between hidden font-normal leading-none pointer-events-auto lg:flex lg:col-span-3 text-body"
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

        <div class="hidden lg:block lg:col-span-1"></div>

        <div
          class="hidden leading-none text-right pointer-events-auto lg:block lg:col-span-1"
        >
          <NuxtLink
            to="/contact"
            class="font-normal transition-opacity text-body hover:opacity-50 whitespace-nowrap"
            >Let's Talk</NuxtLink
          >
        </div>
      </div>
    </header>

    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-[8999] bg-custom-dark text-[#e4e0db] px-layout pt-[25vh] pb-layout w-full h-screen flex flex-col lg:hidden will-change-transform"
      >
        <nav
          ref="mobileNavRef"
          class="flex flex-col items-start overflow-hidden opacity-0 gap-y-6"
        >
          <NuxtLink to="/studio" custom v-slot="{ href }">
            <a
              :href="href"
              @click.prevent="handleNav('/studio')"
              class="block font-normal leading-none uppercase transition-opacity cursor-pointer js-menu-item text-h3 hover:opacity-50"
              >Studio</a
            >
          </NuxtLink>

          <NuxtLink to="/works" custom v-slot="{ href }">
            <a
              :href="href"
              @click.prevent="handleNav('/works')"
              class="block font-normal leading-none uppercase transition-opacity cursor-pointer js-menu-item text-h3 hover:opacity-50"
              >Works</a
            >
          </NuxtLink>

          <NuxtLink to="/insights" custom v-slot="{ href }">
            <a
              :href="href"
              @click.prevent="handleNav('/insights')"
              class="block font-normal leading-none uppercase transition-opacity cursor-pointer js-menu-item text-h3 hover:opacity-50"
              >Insights</a
            >
          </NuxtLink>

          <NuxtLink to="/experience" custom v-slot="{ href }">
            <a
              :href="href"
              @click.prevent="handleNav('/experience')"
              class="block font-normal leading-none uppercase transition-opacity cursor-pointer js-menu-item text-h3 hover:opacity-50"
              >Experience</a
            >
          </NuxtLink>
        </nav>

        <div ref="mobileFooterRef" class="mt-auto overflow-hidden opacity-0">
          <NuxtLink to="/contact" custom v-slot="{ href }">
            <a
              :href="href"
              @click.prevent="handleNav('/contact')"
              class="inline-block font-normal leading-none transition-opacity cursor-pointer js-menu-item text-h4 hover:opacity-50"
              >Let's Talk</a
            >
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const { $gsap, $SplitText, $ScrollSmoother } = useNuxtApp();
const router = useRouter();
const route = useRoute();

// GLOBAL STATE
const isLoaded = useState("isLoaded");
const isMenuOpen = useState<boolean>("isMenuOpen", () => false);
const pendingRoute = useState<string | null>("pendingRoute", () => null);

const headerRef = ref(null);
const mobileNavRef = ref(null);
const mobileFooterRef = ref(null);

// İkon Çizgileri için Refler
const topLine = ref(null);
const bottomLine = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleNav = (path: string) => {
  if (path === route.path) {
    isMenuOpen.value = false;
    return;
  }
  pendingRoute.value = path;
  isMenuOpen.value = false;
};

// HEADER GİRİŞ (Fade-In)
onMounted(() => {
  if (!$gsap) return;
  if (!isLoaded.value) {
    $gsap.set(headerRef.value, { autoAlpha: 0 });
  }
});

watch(isLoaded, (val) => {
  if (val && $gsap && headerRef.value) {
    $gsap.to(headerRef.value, {
      autoAlpha: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.2,
    });
  }
});

// --- MENÜ AÇILIŞ ANİMASYONU ---
const onEnter = (el: Element, done: () => void) => {
  if (!$gsap || !$SplitText) {
    done();
    return;
  }

  const links = el.querySelectorAll(".js-menu-item");
  const navContainer = mobileNavRef.value;
  const footerContainer = mobileFooterRef.value;

  const split = new $SplitText(links, {
    type: "lines",
    linesClass: "line-wrapper",
  });

  split.lines.forEach((line: HTMLElement) => {
    const content = line.innerHTML;
    line.innerHTML = `<div class="line-inner will-change-transform" style="display:block;">${content}</div>`;
    line.style.overflow = "hidden";
  });

  const movingLines = el.querySelectorAll(".line-inner");

  $gsap.set(el, { yPercent: -100 });
  $gsap.set(movingLines, { yPercent: 100 });

  const tl = $gsap.timeline({ onComplete: done });

  // 1. Perdeyi İndir
  tl.to(el, { yPercent: 0, duration: 1.0, ease: "expo.inOut" });

  // 2. İKON ANİMASYONU (Açılış Bittikten Sonra)
  // İki çizgiyi ortada birleştirip tek çizgi yapıyoruz.
  if (topLine.value && bottomLine.value) {
    tl.to(
      [topLine.value, bottomLine.value],
      {
        y: (i) => (i === 0 ? 2.5 : -2.5), // Üstü aşağı, altı yukarı it (gap:4px + 1px height hesabı)
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.1", // Perde iner inmez başlasın (akıcılık için çok hafif bindirdik)
    );
  }

  // 3. Linkleri Getir
  tl.set([navContainer, footerContainer], { opacity: 1 }, "<");
  tl.to(
    movingLines,
    {
      yPercent: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: "expo.out",
    },
    "<0.2",
  );
};

// --- MENÜ KAPANIŞ ANİMASYONU ---
const onLeave = (el: Element, done: () => void) => {
  if (!$gsap) {
    done();
    return;
  }

  const movingLines = el.querySelectorAll(".line-inner");

  const tl = $gsap.timeline({
    onComplete: () => {
      // 3. En Son İkonu Düzelt (Menü tamamen kapandıktan sonra)
      if (topLine.value && bottomLine.value) {
        $gsap.to([topLine.value, bottomLine.value], {
          y: 0, // Eski yerlerine dönsünler
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            // İkon düzelince route değişimi yap (opsiyonel, daha temiz geçiş için)
            if (pendingRoute.value) {
              router.push(pendingRoute.value);
              pendingRoute.value = null;
            }
            done();
          },
        });
      } else {
        if (pendingRoute.value) {
          router.push(pendingRoute.value);
          pendingRoute.value = null;
        }
        done();
      }
    },
  });

  // 1. Linkleri Gönder
  if (movingLines.length > 0) {
    tl.to(movingLines, {
      yPercent: -100,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.in",
    });
  }

  // 2. Perdeyi Kaldır (İkon hala tek çizgi)
  tl.to(
    el,
    {
      yPercent: -100,
      duration: 1.0,
      ease: "expo.inOut",
    },
    movingLines.length > 0 ? "-=0.2" : 0,
  );
};

// --- SCROLL YÖNETİMİ ---
if (process.client) {
  watch(isMenuOpen, (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if ($ScrollSmoother) {
      const smoother = ($ScrollSmoother as any).get();
      if (smoother) smoother.paused(isOpen);
    }
  });
}
</script>

<style scoped>
:deep(.line-wrapper) {
  overflow: hidden !important;
  padding-bottom: 0.1em;
  display: block;
}
:deep(.line-inner) {
  transform-origin: top left;
}
</style>
