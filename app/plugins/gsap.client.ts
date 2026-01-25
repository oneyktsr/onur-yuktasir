import { gsap } from "~/assets/gsap/index.js";
import { ScrollTrigger } from "~/assets/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "~/assets/gsap/ScrollSmoother.js";
import { SplitText } from "~/assets/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    try {
      // Register işlemleri
      (gsap as any).registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

      // --- PERFORMANS AYARI ---
      (gsap as any).ticker.lagSmoothing(500, 33);

      // --- JITTER / TİTREME ÖNLEYİCİ ---
      // 'ScrollTrigger as any' kullanılarak TS hatası giderildi.
      (ScrollTrigger as any).normalizeScroll({
        allowNestedScroll: true,
        lockAxis: false,
        // 'self' parametresine 'any' tipi verildi.
        momentum: (self: any) => Math.min(3, self.velocityY / 1000),
        type: "touch,wheel,pointer",
      });

      // --- CONFIG AYARLARI ---
      (ScrollTrigger as any).config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
        ignoreMobileResize: true,
      });
    } catch (e) {
      console.warn("GSAP Register Error:", e);
    }
  }

  return {
    provide: {
      gsap: gsap as any,
      ScrollTrigger: ScrollTrigger as any,
      ScrollSmoother: ScrollSmoother as any,
      SplitText: SplitText as any,
    },
  };
});
