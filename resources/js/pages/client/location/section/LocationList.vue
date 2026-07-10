<script setup lang="ts">

// COMPONENTS
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import { Icon } from '@iconify/vue';

// TYPES
import { LocationProps } from '../types';



defineProps<LocationProps>();
</script>

<template>
  <section class="w-full px-4 sm:px-6 lg:px-8">
    <div 
      v-if="locations.length > 0" 
      class="max-w-5xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
    >
      <MotionWrapper 
        v-for="(location, index) in locations" 
        :key="location.id"
        :delay="0.05 * (index % 3)"
        class="w-full h-full"
      >
        <article class="w-full flex flex-col gap-4 group">
          <div class="w-full h-64 sm:h-80 md:h-72 lg:h-80 xl:h-96 overflow-hidden rounded-lg shadow-md">
            <img 
              v-if="location.image?.url" 
              :src="location.image.url" 
              :alt="location.image.alt_text || location.name" 
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            >
            <div v-else class="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2">
              <Icon icon="lucide:image-off" class="w-10 h-10 text-slate-400" />
              <span class="text-xs text-slate-400 font-medium">No image available</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <h2 class="text-xl md:text-2xl font-montserrat font-bold text-slate-800 line-clamp-1">
              {{ location.name }}
            </h2>
            <p class="text-sm md:text-base font-roboto text-slate-600 line-clamp-3">
              {{ location.description }}
            </p>
          </div>
        </article>
      </MotionWrapper>
    </div>

    <div 
      v-else 
      class="w-full max-w-md mx-auto my-12 py-12 px-6 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"
    >
      <div class="p-4 bg-amber-50 rounded-full text-amber-600 mb-4 shadow-sm">
        <Icon icon="lucide:map-pin-off" class="w-10 h-10" />
      </div>
      <h3 class="text-lg font-semibold text-slate-800 mb-1">No Locations Found</h3>
      <p class="text-sm text-slate-500 max-w-xs">
        There are currently no locations available for this destination. Please check back later.
      </p>
    </div>
  </section>
</template>