<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import CountryCarousel from '@/components/CountryCarousel.vue'
import ExploreButton from '@/components/ExploreButton.vue'
import { Destination } from '@/types/destination'

interface Props {
  destinations: Destination[]
}

const props = defineProps<Props>();

</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[1100px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-1/2 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="mdi:compass" width="28" height="28" class="md:w-7 md:h-7" />
          <h2 class="font-bold font-roboto text-lg md:text-xl">FEATURED DESTINATIONS</h2>
        </div>
        <div class="space-y-3">
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            EXPLORE BEAUTIFUL COUNTRIES
          </h1>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            Adventure awaits in every corner of the world! Dive into breathtaking views and unforgettable cultures with our top-rated travel spots.
          </p>
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
          <ExploreButton title="Explore More" :href="route('client.destination.country')" />
      </div>
    </div>

    <div class="w-full">
      <CountryCarousel ref="carouselRef" :destinations="props.destinations"  />
    </div>
  </section>
</template>