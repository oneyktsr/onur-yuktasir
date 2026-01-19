import { gsap } from "~/assets/gsap/index.js";
import { ScrollTrigger } from "~/assets/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "~/assets/gsap/ScrollSmoother.js";
import { SplitText } from "~/assets/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    try {
      (gsap as any).registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
      // FPS düşüşlerini engellemek için
      (gsap as any).ticker.lagSmoothing(0);
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
