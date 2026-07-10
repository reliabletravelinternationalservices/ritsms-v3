<script setup lang="ts">

// TYPES
import { type CarouselSectionProps } from '../types'

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import PackageCarousel from '@/components/PackageCarousel.vue'
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue';
import ExploreButton from '@/components/ExploreButton.vue';



defineProps<CarouselSectionProps>();

</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[900px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-2/3 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="material-symbols:globe" width="24" height="24" class="md:w-7 md:h-7" aria-hidden="true" />
          <p class="font-bold font-roboto text-lg md:text-xl">OUTBOUND TOURS</p>
        </div>
        <div class="space-y-3">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            Explore International Travel Packages & Outbound Tours
          </h2>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
              Discover top outbound travel packages to Asia, Europe, and beyond, plus curated island getaways closer to home. Book affordable, reliable international tours designed around the world's most loved destinations.
          </p>
          <ValidToForeignBanner v-if="tag" :tag="tag" />
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
        <ExploreButton title="Explore Outbound Tours" :href="route('client.outbound')" />
      </div>
    </div>

    <div class="w-full">
        <PackageCarousel :is-inbound="false" :packages="packages" />
    </div>
  </section>
</template>