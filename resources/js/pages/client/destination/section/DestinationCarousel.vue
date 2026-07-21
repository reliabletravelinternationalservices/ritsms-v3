<script setup lang="ts">

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import CountryCarousel from '@/components/carousel/country/CountryCarousel.vue'
import ExploreButton from '@/components/ExploreButton.vue'
import { useCountries } from '@/composables/services/useCountries'
import CountryCarouselSkeleton from '@/components/skeleton/CountryCarouselSkeleton.vue'
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue'
import { onMounted } from 'vue'

const {
  countries,
  loading,
  error,
  fetchCountries,
  refresh
} = useCountries()

onMounted(() => {
  fetchCountries()
})

</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[1100px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-2/3 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="mdi:compass" width="28" height="28" class="md:w-7 md:h-7" aria-hidden="true" />
          <p class="font-bold font-roboto text-lg md:text-xl">FEATURED DESTINATIONS</p>
        </div>
        <div class="space-y-3">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            Explore the Most Visited Places
          </h2>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            Adventure awaits in every corner of the world. Dive into breathtaking views and unforgettable cultures with our top-rated travel destinations.
          </p>
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
        <ExploreButton title="Explore Destinations" :href="route('client.destination.countries')" />
      </div>
    </div>

    <div class="w-full">
      <CountryCarouselSkeleton v-if="loading" />
      <ApiFetchError v-else-if="error" :retry="refresh" :description="error" />
      <CountryCarousel v-else :countries="countries"  />
    </div>
  </section>
</template>