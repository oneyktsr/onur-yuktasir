<template>
  <div>
    <header
      class="fixed top-0 left-0 w-full z-[9000] px-layout pt-layout mix-blend-difference text-[#e4e0db] pointer-events-none"
    >
      <div
        class="grid items-center w-full grid-cols-4 md:grid-cols-12 gap-x-md"
      >
        <div
          class="invisible col-span-2 font-normal leading-none tracking-tight uppercase select-none md:col-span-2 text-h4"
        >
          Le Champ™
        </div>

        <div
          class="col-span-2 col-start-3 text-right pointer-events-auto md:col-start-11 md:col-span-2 lg:hidden"
        >
          <button
            @click="toggleMenu"
            class="tracking-widest uppercase transition-opacity text-small hover:opacity-50"
          >
            {{ isMenuOpen ? "Close" : "Menu" }}
          </button>
        </div>

        <div class="hidden lg:block lg:col-span-4"></div>

        <nav
          class="items-center justify-between hidden leading-none pointer-events-auto lg:flex lg:col-span-3 text-body"
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

        <div class="hidden lg:block lg:col-span-2"></div>

        <div
          class="hidden leading-none text-right pointer-events-auto lg:block lg:col-span-1"
        >
          <NuxtLink
            to="/contact"
            class="transition-opacity text-body hover:opacity-50 whitespace-nowrap"
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
          <NuxtLink
            to="/studio"
            @click="toggleMenu"
            class="font-normal leading-none uppercase transition-opacity js-menu-item text-h3 hover:opacity-50"
          >
            Studio
          </NuxtLink>
          <NuxtLink
            to="/works"
            @click="toggleMenu"
            class="font-normal leading-none uppercase transition-opacity js-menu-item text-h3 hover:opacity-50"
          >
            Works
          </NuxtLink>
          <NuxtLink
            to="/insights"
            @click="toggleMenu"
            class="font-normal leading-none uppercase transition-opacity js-menu-item text-h3 hover:opacity-50"
          >
            Insights
          </NuxtLink>
          <NuxtLink
            to="/experience"
            @click="toggleMenu"
            class="font-normal leading-none uppercase transition-opacity js-menu-item text-h3 hover:opacity-50"
          >
            Experience
          </NuxtLink>
        </nav>

        <div ref="mobileFooterRef" class="mt-auto overflow-hidden opacity-0">
          <NuxtLink
            to="/contact"
            @click="toggleMenu"
            class="inline-block font-normal leading-none transition-opacity js-menu-item text-h4 hover:opacity-50"
          >
            Let's Talk
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const { $gsap, $SplitText } = useNuxtApp();
const isMenuOpen = ref(false);
const mobileNavRef = ref(null);
const mobileFooterRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// --- GSAP ANİMASYONLARI ---

const onEnter = (el: Element, done: () => void) => {
  if (!$gsap || !$SplitText) {
    done();
    return;
  }

  const links = el.querySelectorAll(".js-menu-item");
  const navContainer = mobileNavRef.value;
  const footerContainer = mobileFooterRef.value;

  // 1. Split & Wrap
  const split = new $SplitText(links, {
    type: "lines",
    linesClass: "overflow-hidden pb-[0.2em]", // Padding arttırıldı (harf kuyrukları için)
  });

  split.lines.forEach((line: HTMLElement) => {
    const content = line.innerHTML;
    line.innerHTML = `<div class="js-line-content will-change-transform" style="display:block;">${content}</div>`;
  });

  const movingLines = el.querySelectorAll(".js-line-content");

  // 2. Başlangıç Konumları
  $gsap.set(el, { yPercent: -100 });

  // DÜZELTME: Mesafe artırıldı (100 -> 120)
  // Bu sayede metin görünmeden önce hızlanır, maskeye girdiğinde akıcı olur.
  $gsap.set(movingLines, { yPercent: 120 });

  const tl = $gsap.timeline({ onComplete: done });

  // 3. Perde İner
  tl.to(el, {
    yPercent: 0,
    duration: 1.0,
    ease: "expo.inOut",
  });

  // 4. Kilit Aç
  tl.set([navContainer, footerContainer], { opacity: 1 });

  // 5. Metinler Çıkar
  tl.to(movingLines, {
    yPercent: 0,
    rotation: 0.001, // DÜZELTME: Sub-pixel rendering (titremeyi önler)
    duration: 1.1, // Mesafe arttığı için süreyi çok az arttırdık
    stagger: 0.06,
    ease: "expo.out",
  });
};

const onLeave = (el: Element, done: () => void) => {
  if (!$gsap) {
    done();
    return;
  }

  const movingLines = el.querySelectorAll(".js-line-content");

  const tl = $gsap.timeline({ onComplete: done });

  // İçerik Kaybolur
  if (movingLines.length > 0) {
    tl.to(movingLines, {
      yPercent: -120, // Çıkarken de aynı mesafeye gitsin
      rotation: 0.001,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.in",
    });
  }

  // Perde Kalkar
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

if (process.client) {
  watch(isMenuOpen, (val) => {
    document.body.style.overflow = val ? "hidden" : "";
  });
}
</script>

<style scoped>
/* Reset */
</style>
