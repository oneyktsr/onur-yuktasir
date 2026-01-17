import { gsap } from "~/assets/gsap/index.js";
import { ScrollTrigger } from "~/assets/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "~/assets/gsap/ScrollSmoother.js";
import { SplitText } from "~/assets/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Eklentileri kaydet (Hata varsa patlamasın diye try-catch)
    try {
      (gsap as any).registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    } catch (e) {
      console.warn("GSAP Plugin Registration Error:", e);
    }

    (gsap as any).ticker.lagSmoothing(0);

    document.fonts.ready.then(() => {
      try {
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
      } catch (e) {
        console.warn("ScrollSmoother Error:", e);
      }
    });
  }

  return {
    provide: {
      gsap: gsap as any,
      ScrollTrigger: ScrollTrigger as any,
      ScrollSmoother: ScrollSmoother as any,
      SplitText: SplitText as any, // Dışarı aktar
    },
  };
});
