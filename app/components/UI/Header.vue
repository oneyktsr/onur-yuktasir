<template>
  <div>
    <header
      ref="headerRef"
      class="fixed top-0 left-0 w-full z-[9000] px-layout pt-layout mix-blend-difference text-[#e4e0db] pointer-events-none"
    >
      <div class="grid items-start w-full grid-cols-4 md:grid-cols-12 gap-x-md">
        <div class="col-span-2 md:col-span-2"></div>

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

        <div class="hidden lg:block lg:col-span-5"></div>

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

        <div class="hidden lg:block lg:col-span-1"></div>

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

// --- MOBİL MENÜ ANİMASYONLARI ---
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
  tl.to(el, { yPercent: 0, duration: 1.0, ease: "expo.inOut" });
  tl.set([navContainer, footerContainer], { opacity: 1 });
  tl.to(movingLines, {
    yPercent: 0,
    duration: 1.4,
    stagger: 0.08,
    ease: "expo.out",
  });
};

const onLeave = (el: Element, done: () => void) => {
  if (!$gsap) {
    done();
    return;
  }

  const movingLines = el.querySelectorAll(".line-inner");

  const tl = $gsap.timeline({
    onComplete: () => {
      done();
      if (pendingRoute.value) {
        router.push(pendingRoute.value);
        pendingRoute.value = null;
      }
    },
  });

  if (movingLines.length > 0) {
    tl.to(movingLines, {
      yPercent: -100,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.in",
    });
  }

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
