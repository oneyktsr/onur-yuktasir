import { gsap } from "~/assets/gsap/index.js";
import { ScrollTrigger } from "~/assets/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "~/assets/gsap/ScrollSmoother.js";
import { SplitText } from "~/assets/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    try {
      (gsap as any).registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

      // --- PREMIUM SMOOTHNESS AYARI ---
      // Eski ayar: (500, 33) -> Kare atlamaya (jitter) sebep olur.
      // Yeni ayar: (0) -> Bu, "Ne olursa olsun kare atlama, akıcı kal" demektir.
      // İşlemci çok yoğunsa animasyon çok hafif yavaşlar ama asla takılmaz/titremez.
      (gsap as any).ticker.lagSmoothing(0);

      // --- SENKRONİZASYON ---
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
