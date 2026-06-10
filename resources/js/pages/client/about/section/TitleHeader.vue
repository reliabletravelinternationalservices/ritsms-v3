<script setup lang="ts">
import { Icon } from '@iconify/vue';

const appUrl = import.meta.env.VITE_APP_URL;
</script>

<template>
  <section class="w-full relative overflow-hidden px-4 py-8 md:py-12">
    <div class="max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8">
      
      <div class="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-4 text-[var(--secondary-custom)] z-10">
        <h4 class="text-sm md:text-md lg:text-lg font-roboto font-medium tracking-wider">
          ABOUT OUR AGENCY
        </h4>
        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold tracking-wide leading-snug md:leading-tight">
          GUARANTEED PROFESSIONAL <span class="font-thin">CURATED ITINERARIES AND</span> RELIABLE TRAVEL AGENCY
        </h1>
      </div>

      <div class="w-full max-w-[660px] mx-auto z-10">
        <img 
          class="w-full h-auto object-contain" 
          :src="`${appUrl}/storage/upload/agency/about_agency.png`" 
          alt="Agency Image"
        >
      </div>

    </div>

    <span class="absolute top-5 left-4 md:left-8 z-0 pointer-events-none opacity-5 sm:opacity-10">
      <Icon icon="material-symbols:travel-rounded" class="w-20 h-20 sm:w-32 md:w-44 md:h-44 text-[var(--secondary-custom)]" />
    </span>
    <span class="absolute bottom-5 right-4 md:right-8 z-0 pointer-events-none opacity-5 sm:opacity-10">
      <Icon icon="ic:baseline-travel-explore" class="w-20 h-20 sm:w-32 md:w-44 md:h-44 text-[var(--secondary-custom)]" />
    </span>
  </section>
</template>