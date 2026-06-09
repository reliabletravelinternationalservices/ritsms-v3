<script setup lang="ts">
import CountryCard from '@/components/CountryCard.vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import { Destination } from '@/types/destination';

interface Props {
  destinations: Destination[];
}

defineProps<Props>();
</script>

<template>
  <section class="w-full px-4 sm:px-6 lg:px-8">
    <div 
      v-if="destinations && destinations.length > 0"
      class="max-w-5xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <MotionWrapper 
        v-for="(destination, index) in destinations" 
        :key="destination.id"
        :delay="0.05 * (index % 3)" 
        class="h-full w-full"
      >
        <CountryCard 
          :destination="destination" 
          :href="route('client.destination.country.destination', { destination: destination.id })" 
        />
      </MotionWrapper>
    </div>

    <div 
      v-else 
      class="w-full max-w-md mx-auto py-12 flex flex-col items-center justify-center text-center text-slate-400"
    >
      <p class="text-sm font-medium">No destinations found.</p>
    </div>
  </section>
</template>