<template>
  <div class="w-full min-h-screen px-6 md:px-12 pt-32 pb-20 bg-[#e4e0db]">
    <section class="flex flex-col justify-center w-full mb-32">
      <UITextReveal
        tag="h1"
        class="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] text-custom-dark tracking-tighter w-full"
      >
        Digital <br />
        Creative <br />
        <span class="ml-12 opacity-40 md:ml-32">Studio</span>
      </UITextReveal>

      <div
        class="flex flex-col items-end justify-between w-full gap-8 pt-8 mt-16 border-t md:flex-row border-black/10"
      >
        <div class="hidden w-1/3 md:block">
          <UITextReveal
            tag="span"
            :delay="0.2"
            class="text-sm tracking-widest uppercase opacity-40"
          >
            (Scroll for more)
          </UITextReveal>
        </div>

        <div class="w-full md:w-1/2">
          <UITextReveal
            tag="p"
            :delay="0.4"
            :stagger="0.02"
            class="max-w-2xl text-xl leading-tight md:text-3xl opacity-70"
          >
            We craft immersive digital experiences that redefine the boundary
            between art and technology.
          </UITextReveal>
        </div>

        <div class="justify-end hidden w-1/6 md:flex">
          <div class="w-px h-24 bg-current opacity-20"></div>
        </div>
      </div>
    </section>

    <section class="w-full mb-40">
      <div
        class="flex items-baseline justify-between w-full pb-4 mb-12 border-b border-black/10"
      >
        <UITextReveal
          tag="h2"
          class="text-sm tracking-widest uppercase opacity-50"
          >Selected Works</UITextReveal
        >
        <span class="text-sm opacity-50">(01 — 04)</span>
      </div>

      <div class="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
        <div class="flex flex-col gap-24">
          <div class="w-full cursor-pointer group" data-speed="1.05">
            <div
              class="w-full aspect-[4/5] bg-neutral-400 mb-6 group-hover:opacity-90 transition-opacity relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-neutral-800/10"></div>
            </div>
            <UITextReveal tag="h3" class="mb-2 text-3xl font-normal md:text-5xl"
              >Aesop Signature</UITextReveal
            >
            <UITextReveal tag="p" :delay="0.1" class="text-lg opacity-50"
              >Art Direction</UITextReveal
            >
          </div>

          <div class="w-full cursor-pointer group" data-speed="1.0">
            <div
              class="w-full mb-6 transition-opacity aspect-video bg-neutral-800 group-hover:opacity-90"
            ></div>
            <UITextReveal tag="h3" class="mb-2 text-3xl font-normal md:text-5xl"
              >Muji Concept</UITextReveal
            >
            <UITextReveal tag="p" :delay="0.1" class="text-lg opacity-50"
              >Web Design</UITextReveal
            >
          </div>
        </div>

        <div class="flex flex-col gap-24 md:pt-32">
          <div class="w-full cursor-pointer group" data-speed="0.95">
            <div
              class="w-full mb-6 transition-opacity aspect-square bg-neutral-600 group-hover:opacity-90"
            ></div>
            <UITextReveal tag="h3" class="mb-2 text-3xl font-normal md:text-5xl"
              >Braun Archive</UITextReveal
            >
            <UITextReveal tag="p" :delay="0.1" class="text-lg opacity-50"
              >Development</UITextReveal
            >
          </div>

          <div class="w-full cursor-pointer group" data-speed="1.1">
            <div
              class="w-full aspect-[3/4] bg-neutral-500 mb-6 group-hover:opacity-90 transition-opacity"
            ></div>
            <UITextReveal tag="h3" class="mb-2 text-3xl font-normal md:text-5xl"
              >Dieter Rams</UITextReveal
            >
            <UITextReveal tag="p" :delay="0.1" class="text-lg opacity-50"
              >Interaction</UITextReveal
            >
          </div>
        </div>
      </div>
    </section>

    <section class="flex justify-center w-full py-32 border-t border-black/10">
      <div class="w-full max-w-5xl text-center">
        <UITextReveal
          tag="p"
          class="text-5xl font-light leading-tight md:text-8xl"
          data-speed="0.95"
        >
          Less, but better.
        </UITextReveal>
      </div>
    </section>

    <section
      class="h-[60vh] bg-custom-dark text-[#e4e0db] -mx-6 md:-mx-12 p-8 md:p-16 flex flex-col justify-between mt-20"
    >
      <div class="flex items-start justify-between w-full">
        <UITextReveal tag="h2" class="text-5xl tracking-tighter md:text-8xl"
          >Let's Talk</UITextReveal
        >
        <button
          class="border border-[#e4e0db]/20 px-6 py-3 rounded-full hover:bg-[#e4e0db] hover:text-custom-dark transition-colors"
        >
          Get in touch
        </button>
      </div>
      <div class="flex justify-between w-full text-sm uppercase opacity-50">
        <span>© 2024</span>
        <span>Back to Top</span>
      </div>
    </section>
  </div>
</template>
