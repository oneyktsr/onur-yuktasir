<template>
  <div>
    <div class="w-full bg-[#e4e0db] text-custom-dark overflow-hidden">
      <section
        ref="heroSectionRef"
        class="relative w-full h-[80svh] px-layout flex flex-col justify-between pt-[calc(theme('spacing.layout')*3)] pb-[calc(theme('spacing.layout')*2)] md:pb-layout md:pt-[calc(theme('spacing.layout')*2.2)]"
      >
        <div
          class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-md"
        >
          <div
            ref="heroTitleRef"
            class="col-span-4 md:col-span-6 lg:col-span-8"
          >
            <UITextReveal
              tag="h1"
              type="lines"
              class="text-display font-normal leading-[1.1] tracking-tighter -ml-[0.05em] pb-1"
            >
              Create. Connect. <br />
              Cultivate.
            </UITextReveal>
          </div>
        </div>

        <div
          class="grid items-end w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-md"
        >
          <div
            class="flex justify-start order-2 col-span-4 md:col-span-4 lg:col-span-4 md:mb-0 md:order-1"
          >
            <UIButton to="/studio" label="Learn More About Us" mode="light" />
          </div>

          <div
            class="order-1 col-span-4 mb-[calc(theme('spacing.layout')*2)] text-left md:col-start-5 md:col-span-4 md:mb-0 md:order-2 lg:col-start-8 lg:col-span-5"
          >
            <UITextReveal
              tag="p"
              :delay="0.2"
              type="lines"
              class="text-h4 font-normal leading-[1.1] tracking-tight pb-1"
            >
              We create digital experiences that inspire engagement and deliver
              measurable impact for forward — thinking brands and businesses.
            </UITextReveal>
          </div>
        </div>
      </section>

      <section class="w-full">
        <div
          ref="videoContainerRef"
          class="w-full h-[100svh] bg-black relative overflow-hidden group cursor-pointer"
        >
          <video
            ref="videoRef"
            class="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 opacity-70 group-hover:opacity-50"
            :src="showreelVideo"
            autoplay
            loop
            muted
            playsinline
          ></video>

          <div class="absolute inset-0 z-10 flex items-center justify-center">
            <UITextReveal
              tag="span"
              type="lines"
              class="text-[#e4e0db] text-h1 uppercase tracking-tighter mix-blend-difference pb-1"
            >
              Play Reel
            </UITextReveal>
          </div>
        </div>
      </section>
    </div>

    <div
      class="relative z-0 w-full bg-custom-dark text-custom-light pb-[calc(theme('spacing.layout')*4)]"
    >
      <section
        class="w-full px-layout pt-[calc(theme('spacing.layout')*2)] md:pt-layout mb-[calc(theme('spacing.layout')*4)]"
      >
        <div
          class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-md"
        >
          <div
            class="col-span-4 mb-[calc(theme('spacing.layout')*2)] md:col-span-2 md:mb-0 lg:col-span-3 flex items-center gap-x-3 h-fit"
          >
            <div class="w-2 h-2 rounded-full bg-custom-light shrink-0"></div>
            <UITextReveal
              tag="span"
              type="lines"
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal"
            >
              Passion
            </UITextReveal>
          </div>

          <div
            class="col-span-4 md:col-start-3 md:col-span-6 lg:col-start-4 lg:col-span-9"
          >
            <UITextReveal
              tag="p"
              type="lines"
              class="text-h1 font-normal leading-[1.1] tracking-tighter pb-2"
            >
              <span
                class="float-left h-[10px] hidden md:block md:w-[calc(100%/6)] lg:w-[calc((100%/9)*2)]"
                aria-hidden="true"
              ></span>

              We're a visionary team producing innovative work in design &
              technology. For us, this is more than just work.
            </UITextReveal>
          </div>
        </div>

        <div
          class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-md mt-[calc(theme('spacing.layout')*2)]"
        >
          <div
            class="col-span-4 mb-2 md:col-start-5 md:col-span-3 lg:col-start-5 lg:col-span-3 lg:mb-0"
          >
            <UITextReveal
              tag="span"
              type="lines"
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal text-custom-light/50"
            >
              / What Drives Us
            </UITextReveal>
          </div>

          <div
            class="col-span-4 md:col-start-5 md:col-span-3 lg:col-start-8 lg:col-span-3"
          >
            <UITextReveal
              tag="p"
              type="lines"
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal"
            >
              It’s a passion for creating the next generation of digital
              experiences. Every project is an opportunity to explore new ideas,
              push boundaries, and create solutions that truly connect with
              audiences.
            </UITextReveal>
          </div>
        </div>

        <div
          class="grid w-full grid-cols-4 mt-8 md:grid-cols-8 lg:grid-cols-12 gap-x-md lg:mt-12"
        >
          <div
            class="col-span-4 mb-2 md:col-start-5 md:col-span-3 lg:col-start-5 lg:col-span-3 lg:mb-0"
          >
            <UITextReveal
              tag="span"
              type="lines"
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal text-custom-light/50"
            >
              / Our Approach
            </UITextReveal>
          </div>

          <div
            class="col-span-4 md:col-start-5 md:col-span-3 lg:col-start-8 lg:col-span-3"
          >
            <UITextReveal
              tag="p"
              type="lines"
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal"
            >
              By combining creativity, technology, and strategic thinking, we
              deliver work that is not only visually compelling but also
              meaningful and effective, helping brands grow and resonate in an
              ever — changing digital landscape.
            </UITextReveal>
          </div>
        </div>
      </section>

      <section class="w-full overflow-hidden">
        <div
          class="grid items-baseline grid-cols-4 border-b pb-layout px-layout md:grid-cols-8 lg:grid-cols-12 gap-x-md border-custom-light/10"
        >
          <div class="col-span-2 md:col-span-4 lg:col-span-6">
            <UITextReveal
              tag="h2"
              type="lines"
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal"
            >
              Trusted By
            </UITextReveal>
          </div>
          <div class="col-span-2 text-right md:col-span-4 lg:col-span-6">
            <span
              class="text-[clamp(1rem,0.75rem+0.5vw,3rem)] leading-tight font-normal text-custom-light/50"
            >
              (18 — 26)
            </span>
          </div>
        </div>

        <div class="w-full pt-layout">
          <div
            ref="marqueeContainerRef"
            class="relative flex w-full overflow-hidden"
          >
            <div
              ref="marqueeInnerRef"
              class="flex items-center w-max will-change-transform"
            >
              <div
                v-for="set in 3"
                :key="`set-${set}`"
                class="flex items-center pr-8 gap-x-8 md:gap-x-12 lg:gap-x-16 md:pr-12 lg:pr-16 shrink-0"
              >
                <svg
                  v-for="i in 9"
                  :key="`l-${set}-${i}`"
                  class="w-auto h-5 overflow-visible opacity-50 fill-current md:h-6 lg:h-7 text-custom-light"
                  viewBox="0 0 150 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect v-if="i % 3 === 0" width="30" height="30" />
                  <circle v-else-if="i % 3 === 1" cx="15" cy="15" r="15" />
                  <path v-else d="M15 0 L30 30 L0 30 Z" />
                  <text
                    x="40"
                    y="22"
                    font-family="sans-serif"
                    font-size="20"
                    font-weight="bold"
                  >
                    BRAND {{ i }}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div
      ref="curtainWrapperRef"
      class="relative z-10 w-full will-change-transform"
    >
      <section
        class="w-full bg-custom-light text-custom-dark px-layout py-section pb-[calc(theme('spacing.layout')*4)]"
      >
        <div
          class="grid w-full grid-cols-4 pb-8 mb-12 border-b md:grid-cols-8 lg:grid-cols-12 gap-x-md border-custom-dark/10"
        >
          <div
            class="col-span-4 md:col-start-3 md:col-span-6 lg:col-start-3 lg:col-span-8"
          >
            <UITextReveal
              tag="h2"
              type="lines"
              class="text-display font-normal leading-[1.1] tracking-tighter -ml-[0.05em] pb-1"
            >
              Selected Works
            </UITextReveal>
          </div>
        </div>

        <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-md gap-y-16">
          <div class="cursor-pointer group">
            <div
              class="w-full aspect-[4/3] bg-custom-dark/5 overflow-hidden mb-4 relative"
            >
              <div
                class="absolute inset-0 transition-colors duration-500 bg-custom-dark/10 group-hover:bg-custom-dark/20"
              ></div>
            </div>
            <div
              class="flex items-baseline justify-between pb-2 border-b border-custom-dark/20"
            >
              <h3 class="text-h4 font-normal leading-[1.1] tracking-tight pb-1">
                Aesop Signature
              </h3>
              <span class="opacity-60 text-small">2024</span>
            </div>
            <p class="mt-2 opacity-70 text-body">Digital Experience</p>
          </div>

          <div class="cursor-pointer group">
            <div
              class="w-full aspect-[4/3] bg-custom-dark/5 overflow-hidden mb-4 relative"
            >
              <div
                class="absolute inset-0 transition-colors duration-500 bg-custom-dark/10 group-hover:bg-custom-dark/20"
              ></div>
            </div>
            <div
              class="flex items-baseline justify-between pb-2 border-b border-custom-dark/20"
            >
              <h3 class="text-h4 font-normal leading-[1.1] tracking-tight pb-1">
                Astra Foundation
              </h3>
              <span class="opacity-60 text-small">2023</span>
            </div>
            <p class="mt-2 opacity-70 text-body">Branding, Website</p>
          </div>

          <div class="cursor-pointer group">
            <div
              class="w-full aspect-[4/3] bg-custom-dark/5 overflow-hidden mb-4 relative"
            >
              <div
                class="absolute inset-0 transition-colors duration-500 bg-custom-dark/10 group-hover:bg-custom-dark/20"
              ></div>
            </div>
            <div
              class="flex items-baseline justify-between pb-2 border-b border-custom-dark/20"
            >
              <h3 class="text-h4 font-normal leading-[1.1] tracking-tight pb-1">
                Neo Gallery
              </h3>
              <span class="opacity-60 text-small">2023</span>
            </div>
            <p class="mt-2 opacity-70 text-body">Immersive, WebGL</p>
          </div>

          <div class="cursor-pointer group">
            <div
              class="w-full aspect-[4/3] bg-custom-dark/5 overflow-hidden mb-4 relative"
            >
              <div
                class="absolute inset-0 transition-colors duration-500 bg-custom-dark/10 group-hover:bg-custom-dark/20"
              ></div>
            </div>
            <div
              class="flex items-baseline justify-between pb-2 border-b border-custom-dark/20"
            >
              <h3 class="text-h4 font-normal leading-[1.1] tracking-tight pb-1">
                Studio Lumina
              </h3>
              <span class="opacity-60 text-small">2022</span>
            </div>
            <p class="mt-2 opacity-70 text-body">Identity, Strategy</p>
          </div>
        </div>
      </section>

      <div class="w-full bg-custom-dark text-custom-light">
        <section
          class="grid w-full grid-cols-4 px-layout py-section md:grid-cols-8 lg:grid-cols-12 gap-x-md"
        >
          <div
            class="col-span-4 text-center md:col-start-2 md:col-span-6 lg:col-start-2 lg:col-span-10"
          >
            <UITextReveal
              tag="p"
              type="lines"
              class="text-h1 font-normal leading-[0.96] tracking-tighter pb-2"
              data-speed="0.95"
            >
              "Good design is as little design as possible."
            </UITextReveal>
          </div>
        </section>

        <footer
          class="w-full overflow-hidden border-t px-layout py-section border-custom-light/10"
        >
          <div
            class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-md h-[50vh] content-between"
          >
            <div class="col-span-4 md:col-span-6 lg:col-span-8">
              <UITextReveal
                tag="h2"
                type="lines"
                class="text-display tracking-tighter leading-[0.8]"
                >Let's <br />
                Talk</UITextReveal
              >
            </div>

            <div
              class="flex items-start justify-start col-span-4 mt-8 md:col-span-2 md:justify-end md:mt-0 lg:col-span-4"
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
              class="col-span-4 md:col-span-8 lg:col-span-12 flex justify-between items-end opacity-50 text-small uppercase border-t border-[#e4e0db]/20 pt-8 mt-auto"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import UIButton from "~/components/UI/Button.vue";
import showreelVideo from "~/assets/showreel/2024-04-08T11-54-16.659Z-reel-teaser.mp4";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const heroSectionRef = ref<HTMLElement | null>(null);
const heroTitleRef = ref<HTMLElement | null>(null);
const videoContainerRef = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLElement | null>(null);

const marqueeInnerRef = ref<HTMLElement | null>(null);
const curtainWrapperRef = ref<HTMLElement | null>(null);

let ctx: any;

onMounted(async () => {
  if (!$gsap || !$ScrollTrigger) return;

  await document.fonts.ready;

  let mm = $gsap.matchMedia();

  ctx = $gsap.context(() => {
    mm.add(
      {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      },
      (context: any) => {
        let { isMobile } = context.conditions;

        const titleLag = isMobile ? 250 : 150;
        const videoScale = isMobile ? 1.7 : 1.5;
        const videoMove = isMobile ? 45 : 35;

        // HERO ANIMATIONS
        if (heroTitleRef.value && heroSectionRef.value) {
          $gsap.to(heroTitleRef.value, {
            yPercent: titleLag,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.value,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (videoContainerRef.value && videoRef.value) {
          $gsap.fromTo(
            videoRef.value,
            {
              scale: videoScale,
              yPercent: -videoMove,
            },
            {
              yPercent: videoMove,
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

        // --- SCROLL-BASED CURTAIN EFFECT (FASTER & CLEARER) ---
        if (curtainWrapperRef.value) {
          $gsap.fromTo(
            curtainWrapperRef.value,
            { y: 0 },
            {
              // HIZLANDIRILDI: -150 yerine -300 yapıldı.
              // Bu sayede üzerine binme efekti çok daha net ve hızlı olacak.
              y: -300,
              ease: "none",
              scrollTrigger: {
                trigger: curtainWrapperRef.value,
                start: "top 110%", // Takılmayı önlemek için erken başlangıç
                end: "top top",
                scrub: true,
              },
            },
          );
        }

        // --- SIMPLE MARQUEE LOGIC ---
        if (marqueeInnerRef.value) {
          let xPercent = 0;
          const speed = -0.002;

          $gsap.ticker.add((time: number, deltaTime: number) => {
            xPercent += speed * deltaTime * 0.8;

            if (xPercent <= -33.333) {
              xPercent = 0;
            }

            $gsap.set(marqueeInnerRef.value, { xPercent: xPercent });
          });
        }
      },
    );
  });

  $ScrollTrigger.refresh();
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
