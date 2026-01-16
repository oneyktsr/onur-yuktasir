// app/plugins/gsap.client.ts
import { gsap } from "~/assets/gsap/index.js";
import { ScrollTrigger } from "~/assets/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "~/assets/gsap/ScrollSmoother.js";
import { SplitText } from "~/assets/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // TypeScript'i susturmak için (as any) kullanıyoruz
    (gsap as any).registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    (gsap as any).ticker.lagSmoothing(0);

    document.fonts.ready.then(() => {
      // ScrollSmoother'ı 'any' olarak işaretle
      (ScrollSmoother as any).create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        effects: true,
        normalizeScroll: {
          allowNestedScroll: true,
          debounce: false,
          type: "touch,wheel,pointer",
        },
        ignoreMobileResize: true,
        smoothTouch: 0.1,
      });

      (ScrollTrigger as any).refresh();
    });
  }

  return {
    provide: {
      // Burada 'as any' diyerek tüm projeye "bu nesnelerde kural arama" diyoruz.
      // Bu işlem TextReveal.vue içindeki "Property 'from' does not exist" hatasını da çözer.
      gsap: gsap as any,
      ScrollTrigger: ScrollTrigger as any,
      ScrollSmoother: ScrollSmoother as any,
      SplitText: SplitText as any,
    },
  };
});
