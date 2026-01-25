import { gsap } from "~/assets/gsap/index.js";
import { ScrollTrigger } from "~/assets/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "~/assets/gsap/ScrollSmoother.js";
import { SplitText } from "~/assets/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    try {
      (gsap as any).registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

      // --- PERFORMANS AYARI (STANDART) ---
      (gsap as any).ticker.lagSmoothing(500, 33);

      // --- %100 GÜVENLİK AYARI (YENİ) ---
      // Resize, Load veya DOM değişimlerinde hesaplamaları zorla.
      // Bu, SmoothScroll ile ScrollTrigger arasındaki milimetrik senkronizasyonu korur.
      (ScrollTrigger as any).config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
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
