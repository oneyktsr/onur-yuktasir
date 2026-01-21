<template>
  <div>
    <div
      class="fixed inset-0 z-[10000] px-layout pt-layout w-full h-full pointer-events-none"
      style="mix-blend-mode: difference; color: #e4e0db"
    >
      <div class="grid w-full grid-cols-4 md:grid-cols-12 gap-x-md">
        <div class="flex items-start col-span-2 md:col-span-2">
          <a
            href="/"
            @click.prevent="handleLogoClick"
            class="block"
            :class="
              isLoaded
                ? 'pointer-events-auto cursor-pointer'
                : 'pointer-events-none cursor-default'
            "
            aria-label="Back to Home"
          >
            <h1
              ref="brandRef"
              class="font-normal leading-none tracking-tight origin-left opacity-0 text-h4"
            >
              Le Champ™
            </h1>
          </a>
        </div>
      </div>
    </div>

    <div
      ref="curtainRef"
      class="fixed inset-0 z-[9999] bg-custom-dark text-[#e4e0db] px-layout w-full h-full cursor-wait flex flex-col justify-center"
    >
      <div
        class="grid items-center w-full grid-cols-4 md:grid-cols-12 gap-x-md"
      >
        <div class="col-span-2 md:col-span-2"></div>

        <div
          class="flex col-start-3 col-span-2 md:col-start-6 md:col-span-7 relative h-[1px] overflow-hidden items-center opacity-30"
        >
          <div
            ref="lineRef"
            class="absolute top-0 left-0 h-full w-full bg-[#e4e0db] origin-left scale-x-0"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const curtainRef = ref<HTMLElement | null>(null);
const brandRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);

const { $gsap, $SplitText } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// GLOBAL STATE
const isLoaded = useState("isLoaded");
const isMenuOpen = useState<boolean>("isMenuOpen");
const pendingRoute = useState<string | null>("pendingRoute");

// LOGO TIKLAMA MANTIĞI
const handleLogoClick = () => {
  if (isMenuOpen.value) {
    if (route.path !== "/") {
      pendingRoute.value = "/";
    }
    isMenuOpen.value = false;
  } else {
    if (route.path !== "/") {
      router.push("/");
    }
  }
};

// PRELOADER ANİMASYONLARI
onMounted(() => {
  if (!$gsap || !$SplitText || !brandRef.value) return;

  const split = new $SplitText(brandRef.value, { type: "chars" });

  // --- DİNAMİK HİZALAMA VE SCALE AYARI ---
  const logoRect = brandRef.value.getBoundingClientRect();
  const screenCenterY = window.innerHeight / 2;
  const logoCenterY = logoRect.top + logoRect.height / 2;
  const moveY = screenCenterY - logoCenterY;

  // Mobil kontrolü: 768px altıysa mobil kabul et
  const isMobile = window.innerWidth < 768;

  // Scale ayarı: Mobilde 1.45 (biraz daha büyük), Masaüstünde 1.2
  const initialScale = isMobile ? 1.45 : 1.2;

  // Başlangıç değerleri (scale dinamikleştirildi)
  $gsap.set(brandRef.value, { opacity: 1, y: moveY, scale: initialScale });
  $gsap.set(split.chars, { opacity: 0 });
  $gsap.set(lineRef.value, { transformOrigin: "left center" });

  const tl = $gsap.timeline({
    onComplete: () => {
      isLoaded.value = true;
      if (curtainRef.value) curtainRef.value.style.display = "none";
    },
  });

  // 1. Logo Harfleri Belirir
  tl.to(split.chars, {
    opacity: 1,
    duration: 1.0,
    stagger: { from: "random", amount: 0.8 },
    ease: "power2.out",
  });

  // 2. Çizgi Dolar
  tl.to(
    lineRef.value,
    { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
    "progress",
  );

  // 3. Çizgi Kaybolur
  tl.set(lineRef.value, { transformOrigin: "right center" });
  tl.to(
    lineRef.value,
    { scaleX: 0, duration: 0.6, ease: "power2.inOut" },
    "exit",
  );

  // 4. Perde ve Logo Yerine Gider (Scale 1'e döner)
  tl.to(
    curtainRef.value,
    { yPercent: -100, duration: 1.5, ease: "expo.inOut" },
    "reveal",
  );
  tl.to(
    brandRef.value,
    { y: 0, scale: 1, duration: 1.5, ease: "expo.inOut" },
    "reveal",
  );
});
</script>

<style scoped></style>
