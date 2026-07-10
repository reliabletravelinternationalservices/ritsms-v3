<script setup lang="ts">
import { Destination } from '@/types/destination';
import { Icon } from '@iconify/vue';

interface Props {
    destination: Destination;
    href: string;
}

defineProps<Props>();
</script>

<template>
    <a :href="href" class="w-full" :aria-label="`Explore travel destinations in ${destination.country}`">
            <div class="carousel__item h-[400px] md:h-[500px] w-full relative">
              <div class="h-full w-full absolute top-0 left-0 bg-black/40 flex items-end p-6 md:p-8">
                  <span v-if="destination.tag" class="absolute top-2 right-4 text-xs md:text-sm bg-black/30 text-white px-3 py-1">
                    {{ destination.tag }}
                  </span>
                  <div class="border-l-4 border-[var(--tertiary-custom)] pl-2 text-left">
                      <span class="flex items-end justify-start">
                          <Icon icon="mdi:map-marker" width="22" height="22" class="text-[var(--tertiary-custom)] md:w-[26px] md:h-[26px]" aria-hidden="true" />
                          <h3 class="font-bold font-montserrat text-base md:text-lg text-[var(--tertiary-custom)]">{{ destination.country }}</h3>
                      </span>
                      <span v-if="destination.locations" class="flex items-end justify-start">
                          <p class="text-[var(--primary-custom)] font-roboto text-sm md:text-base">{{ destination.locations.length }} Destinations</p>
                      </span>
                  </div>
              </div>
            <img 
              v-if="destination.image?.url"
              :src="destination.image.url" 
              :alt="destination.image.alt_text || `${destination.country} travel destination`"
              loading="lazy"
              class="w-full h-full object-cover"
            />
            <div 
              v-else
              class="w-full h-full bg-gray-200 flex items-center justify-center"
            >
              <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" aria-hidden="true" />
            </div>
          </div>
    </a>
</template>