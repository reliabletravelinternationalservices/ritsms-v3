<script setup lang="ts">

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import PackageCarousel from '@/components/PackageCarousel.vue'
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue'
import ExploreButton from '@/components/ExploreButton.vue'

// TYPES
import { type CarouselSectionProps } from '../types'

defineProps<CarouselSectionProps>();

</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[900px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-2/3 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="icon-park-solid:local" width="28" height="28" class="md:w-7 md:h-7" aria-hidden="true" />
          <p class="font-bold font-roboto text-lg md:text-xl">INBOUND TOURS</p>
        </div>
        <div class="space-y-3">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            Explore the Philippines' Paradise Islands
          </h2>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            Discover top inbound travel packages and domestic tours across the Philippines. See why our pristine beaches, islands, and warm hospitality make the country a top global favorite, just a flight away.
          </p>
            <ValidToForeignBanner v-if="tag" :tag="tag" />
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
        <ExploreButton title="Explore Inbound Tours" :href="route('client.inbound')" />
      </div>
    </div>

    <div class="w-full">
        <PackageCarousel :is-inbound="true"  :packages="packages" />
    </div>
  </section>
</template>