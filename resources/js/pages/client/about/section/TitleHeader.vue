<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="w-full relative overflow-hidden">
    <div class="max-w-5xl m-auto">
      <span class="flex items-center justify-center">
        <div class="max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 p-6 md:p-8 text-[var(--secondary-custom)]">
          <span class="flex flex-col items-center justify-center gap-4 text-center">
            <h4 class="text-md md:text-lg font-roboto font-medium">
              ABOUT OUR AGENCY
            </h4>
            <h1 class="text-xl md:text-2xl lg:text-3xl font-montserrat font-bold tracking-wide">
              GUARANTEED PROFESSIONAL <span class="font-thin">CURATED ITINERARIES AND</span> RELIABLE TRAVEL AGENCY
            </h1>
          </span>
        </div>
      </span>
      <div class="w-[660px] m-auto">
        <img class="w-full h-full object-contain" src="http://127.0.0.1:8000/storage/upload/agency/about_agency.png" alt="Traveler">
      </div>
    </div>
    <span class="absolute top-5 left-8 z-0 pointer-events-none opacity-5">
      <Icon icon="material-symbols:travel-rounded" class="w-32 h-32 md:w-44 md:h-44 text-[var(--secondary-custom)]" />
    </span>
    <span class="absolute bottom-5 right-8 z-0 pointer-events-none opacity-5">
      <Icon icon="ic:baseline-travel-explore" class="w-32 h-32 md:w-44 md:h-44 text-[var(--secondary-custom)]" />
    </span>
  </section>
</template>