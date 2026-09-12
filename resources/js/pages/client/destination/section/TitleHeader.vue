<script setup lang="ts">

// COMPONENTS
import { Icon } from '@iconify/vue';

// CONSTANTS
import { DESTINATION_HERO_IMAGE } from '../constants';

</script>

<template>
  <section class="w-full h-[400px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
    <div class="w-full h-full absolute top-0 left-0">
      <img class="w-full h-full object-cover" :src="DESTINATION_HERO_IMAGE" alt="Travel destinations covered by Reliable International Travel Services">
      
      <span class="absolute inset-0 bg-gradient-to-t bg-black/80 flex items-center justify-center">
        <div class="max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 p-6 md:p-8 text-[var(--primary-custom)]">
          
          <span class="flex flex-col items-center justify-center gap-3 text-center">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold tracking-wide">
              Explore Our Travel Destinations
            </h1>
            <p class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed">
              From local gems to international wonders, we ensure top-tier service standards at every stop. High-quality travel is our standard, not an extra
            </p>
          </span>

          <span class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a :href="route('client.outbound')">
              <button class="w-full sm:w-auto bg-[var(--outbound-custom)] text-[var(--primary-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-custom)] border-2 border-[var(--outbound-custom)] hover:border-[var(--tertiary-custom)] transition-all duration-200">
                <span class="whitespace-nowrap">Outbound Packages</span>
                <Icon icon="tabler:arrow-right" width="20" height="20" aria-hidden="true" />
              </button>
            </a>
            
            <a :href="route('client.inbound')">
              <button class="w-full sm:w-auto bg-[var(--inbound-opacity-custom)] border-2 border-[var(--inbound-custom)] text-[var(--inbound-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--inbound-custom)] hover:text-[var(--primary-custom)] hover:border-[var(--inbound-custom)] transition-all duration-200">
                <span class="whitespace-nowrap">Inbound Packages</span>
                <Icon icon="tabler:arrow-right" width="20" height="20" aria-hidden="true" />
              </button>
            </a>
          </span>

        </div>
      </span>
    </div>
  </section>
</template>