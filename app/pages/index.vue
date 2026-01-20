<template>
  <div>
    <div
      class="w-full min-h-screen bg-[#e4e0db] text-custom-dark overflow-hidden"
    >
      <section
        class="relative w-full h-[80svh] px-layout flex flex-col justify-between pb-layout pt-[calc(theme('spacing.layout')*3)]"
      >
        <div class="grid w-full grid-cols-4 md:grid-cols-12 gap-x-md">
          <div class="col-span-4 md:col-span-8" data-speed="0.95">
            <UITextReveal
              tag="h1"
              type="lines"
              class="text-display font-normal leading-[0.85] tracking-tighter -ml-[0.05em]"
            >
              Create. Connect. <br />
              Cultivate.
            </UITextReveal>
          </div>
        </div>

        <div class="grid items-end w-full grid-cols-4 md:grid-cols-12 gap-x-md">
          <div
            class="flex justify-start order-2 col-span-4 md:col-span-4 md:mb-0 md:order-1"
          >
            <NuxtLink
              to="/studio"
              class="inline-flex items-center font-normal transition-opacity group text-body hover:opacity-50"
            >
              <span>Learn More About Us</span>
            </NuxtLink>
          </div>

          <div
            class="order-1 col-span-4 mb-6 text-left md:col-span-5 md:col-start-8 md:mb-0 md:order-2"
          >
            <UITextReveal
              tag="p"
              :delay="0.2"
              type="lines"
              class="text-h4 font-normal md:font-light leading-[1.1] tracking-tight"
            >
              We create digital experiences that inspire engagement and deliver
              measurable impact for forward-thinking brands and businesses.
            </UITextReveal>
          </div>
        </div>
      </section>

      <section class="w-full mb-section">
        <div
          ref="videoContainerRef"
          class="w-full h-[100svh] bg-black relative overflow-hidden group cursor-pointer"
        >
          <video
            ref="videoRef"
            class="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 opacity-70 group-hover:opacity-50"
            src="https://download-video-ak.vimeocdn.com/v3-1/playback/56fa7b5b-2384-4036-9b9e-ae1831a83b61/1235aa87-0b5bb3b9?__token__=st=1768935141~exp=1768938741~acl=%2Fv3-1%2Fplayback%2F56fa7b5b-2384-4036-9b9e-ae1831a83b61%2F1235aa87-0b5bb3b9%2A~hmac=ff19b5eb50306ede1c5822472f5ab76fb9e3f2511f00e05de1dac9e48e7d6de8&r=dXMtd2VzdDE%3D"
            autoplay
            loop
            muted
            playsinline
          ></video>

          <div class="absolute inset-0 z-10 flex items-center justify-center">
            <UITextReveal
              tag="span"
              type="lines"
              class="text-[#e4e0db] text-h1 uppercase tracking-tighter mix-blend-difference"
            >
              Play Reel
            </UITextReveal>
          </div>
        </div>
      </section>

      <section class="w-full mb-section px-layout">
        <div
          class="grid items-baseline grid-cols-4 pb-4 mb-12 border-b md:grid-cols-12 gap-x-md border-custom-dark/10"
        >
          <div class="col-span-2 md:col-span-6">
            <UITextReveal
              tag="h2"
              type="lines"
              class="tracking-widest uppercase opacity-50 text-small"
              >Selected Works</UITextReveal
            >
          </div>
          <div class="col-span-2 text-right md:col-span-6">
            <span class="opacity-50 text-small">(01 — 04)</span>
          </div>
        </div>

        <div class="grid grid-cols-4 md:grid-cols-12 gap-x-md gap-y-section">
          <div class="flex flex-col col-span-4 md:col-span-6 gap-y-section">
            <div class="block w-full cursor-pointer group" data-speed="1.05">
              <div
                class="w-full aspect-[4/5] bg-neutral-400 mb-6 group-hover:opacity-90 transition-opacity relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-neutral-800/10 mix-blend-multiply"
                ></div>
              </div>
              <div class="flex flex-col pt-4 border-t border-custom-dark/10">
                <UITextReveal
                  tag="h3"
                  type="lines"
                  class="mb-2 font-normal leading-none text-h2"
                  >Aesop Signature</UITextReveal
                >
                <UITextReveal
                  tag="p"
                  type="lines"
                  :delay="0.1"
                  class="opacity-50 text-body"
                  >Art Direction & Design</UITextReveal
                >
              </div>
            </div>
            <div class="block w-full cursor-pointer group" data-speed="1.0">
              <div
                class="w-full mb-6 transition-opacity aspect-video bg-neutral-800 group-hover:opacity-90"
              ></div>
              <div class="flex flex-col pt-4 border-t border-custom-dark/10">
                <UITextReveal
                  tag="h3"
                  type="lines"
                  class="mb-2 font-normal leading-none text-h2"
                  >Muji Concept</UITextReveal
                >
                <UITextReveal
                  tag="p"
                  type="lines"
                  :delay="0.1"
                  class="opacity-50 text-body"
                  >Web Design</UITextReveal
                >
              </div>
            </div>
          </div>

          <div
            class="flex flex-col col-span-4 md:col-span-6 gap-y-section md:pt-32"
          >
            <div class="block w-full cursor-pointer group" data-speed="0.95">
              <div
                class="w-full mb-6 transition-opacity aspect-square bg-neutral-600 group-hover:opacity-90"
              ></div>
              <div class="flex flex-col pt-4 border-t border-custom-dark/10">
                <UITextReveal
                  tag="h3"
                  type="lines"
                  class="mb-2 font-normal leading-none text-h2"
                  >Braun Archive</UITextReveal
                >
                <UITextReveal
                  tag="p"
                  type="lines"
                  :delay="0.1"
                  class="opacity-50 text-body"
                  >Development</UITextReveal
                >
              </div>
            </div>
            <div class="block w-full cursor-pointer group" data-speed="1.1">
              <div
                class="w-full aspect-[3/4] bg-neutral-500 mb-6 group-hover:opacity-90 transition-opacity"
              ></div>
              <div class="flex flex-col pt-4 border-t border-custom-dark/10">
                <UITextReveal
                  tag="h3"
                  type="lines"
                  class="mb-2 font-normal leading-none text-h2"
                  >Dieter Rams</UITextReveal
                >
                <UITextReveal
                  tag="p"
                  type="lines"
                  :delay="0.1"
                  class="opacity-50 text-body"
                  >Interaction</UITextReveal
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="grid w-full grid-cols-4 border-t px-layout py-section border-custom-dark/10 md:grid-cols-12 gap-x-md"
      >
        <div class="col-span-4 text-center md:col-start-2 md:col-span-10">
          <UITextReveal
            tag="p"
            type="lines"
            class="text-h1 font-light leading-[1.1] tracking-tight"
            data-speed="0.95"
          >
            "Good design is as little design as possible."
          </UITextReveal>
        </div>
      </section>

      <footer
        class="w-full bg-custom-dark text-[#e4e0db] px-layout py-section overflow-hidden"
      >
        <div
          class="grid grid-cols-4 md:grid-cols-12 gap-x-md h-[50vh] content-between"
        >
          <div class="col-span-4 md:col-span-8">
            <UITextReveal
              tag="h2"
              type="lines"
              class="text-display tracking-tighter leading-[0.8]"
              >Let's <br />
              Talk</UITextReveal
            >
          </div>

          <div
            class="flex items-start justify-start col-span-4 mt-8 md:col-span-4 md:justify-end md:mt-0"
          >
            <button
              class="group border border-[#e4e0db]/20 px-10 py-5 rounded-full hover:bg-[#e4e0db] hover:text-custom-dark transition-all duration-300"
            >
              <span
                class="inline-block text-xs tracking-widest uppercase transition-transform text-body group-hover:translate-x-1"
                >Get in touch</span
              >
            </button>
          </div>

          <div
            class="col-span-4 md:col-span-12 flex justify-between items-end opacity-50 text-small uppercase border-t border-[#e4e0db]/20 pt-8 mt-auto"
          >
            <div class="flex flex-col gap-1">
              <span>© 2026 Studio</span>
              <span>All Rights Reserved</span>
            </div>
            <span class="transition-opacity cursor-pointer hover:opacity-100"
              >Back to Top</span
            >
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const videoContainerRef = ref(null);
const videoRef = ref(null);

let ctx: any;

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return;

  ctx = $gsap.context(() => {
    // --- VIDEO PARALLAX (MAXIMUM) ---
    // Scale 1.5 (%50 zoom) -> Çok geniş hareket alanı.
    // yPercent -35/+35 -> Çok belirgin kayma hissi.
    if (videoContainerRef.value && videoRef.value) {
      $gsap.fromTo(
        videoRef.value,
        {
          scale: 1.5, // Oldukça büyüt
          yPercent: -35, // Yukarıdan başla
        },
        {
          yPercent: 35, // Aşağıda bitir
          ease: "none",
          scrollTrigger: {
            trigger: videoContainerRef.value,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  }, videoContainerRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
