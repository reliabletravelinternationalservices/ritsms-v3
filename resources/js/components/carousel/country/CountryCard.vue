<script setup lang="ts">
import { getImageUrl } from '@/lib/utils'
import { Country } from '@/types/country'
import { Icon } from '@iconify/vue'

interface Props {
  country: Country
  href: string
}

defineProps<Props>()
</script>

<template>
  <a
    :href="href"
    class="group block w-full overflow-hidden"
    :aria-label="`Explore travel destinations in ${country.country}`"
  >
    <div class="relative h-[400px] w-full overflow-hidden md:h-[500px]">

      <!-- Image -->
      <img
        v-if="country.image"
        :src="getImageUrl(country.image.file_path)"
        :alt="country.image.alt_text || `${country.country} travel destination`"
        loading="lazy"
        class="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-75"
      />

      <!-- No Image -->
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-gray-200"
      >
        <Icon
          icon="mdi:image-off"
          width="48"
          height="48"
          class="text-gray-400"
        />
      </div>

      <!-- Overlay -->
      <div
        class="absolute inset-0 flex items-end bg-black/40 p-6 transition-all duration-300 group-hover:bg-black/55 md:p-8"
      >

        <!-- Tag -->
        <span
          v-if="country.tag"
          class="absolute right-4 top-4 bg-black/40 px-3 py-1 text-xs text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--tertiary-custom)] group-hover:text-black md:text-sm"
        >
          {{ country.tag }}
        </span>

        <!-- Content -->
        <div
          class="border-l-4 border-[var(--tertiary-custom)] pl-2 transition-all duration-300 group-hover:translate-x-1"
        >
          <div class="flex justify-start items-center gap-1">
            <!-- <Icon
              icon="mdi:map-marker"
              aria-hidden="true"
              class="h-6 w-6 text-[var(--tertiary-custom)] transition-transform duration-300 group-hover:scale-110"
            /> -->
            <span>
                <h3
                  class="font-montserrat text-lg font-bold text-[var(--tertiary-custom)] transition-colors duration-300 group-hover:text-white"
                >
                  {{ country.country }}
                </h3>
                <p
                  v-if="country.locations_count > 0"
                  class="font-roboto text-sm text-[var(--primary-custom)] transition-colors duration-300 group-hover:text-white"
                >
                    {{ country.locations_count }} Destinations
                </p>
            </span>
          </div>
        </div>

      </div>
    </div>
  </a>
</template>