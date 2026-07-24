<script setup lang="ts">
// COMPONENTS
import MotionWrapper from '@/components/ui/MotionWrapper.vue'
import { Icon } from '@iconify/vue'

// TYPES
import type { LocationProps } from '../types'
import { getImageUrl } from '@/lib/utils'

defineProps<LocationProps>()
</script>

<template>
  <section class="w-full px-4 sm:px-6 lg:px-8">
    <!-- Locations -->
    <div
      v-if="locations.length"
      class="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:gap-10"
    >
      <MotionWrapper
        v-for="(location, index) in locations"
        :key="location.id"
        :delay="0.05 * (index % 3)"
        class="h-full w-full"
      >
        <article class="group flex h-full flex-col gap-4">
          <!-- Image -->
          <div
            class="h-64 overflow-hidden rounded-lg shadow-md sm:h-80 md:h-72 lg:h-80 xl:h-96"
          >
            <img
              v-if="location.image"
              :src="getImageUrl(location.image.file_path)"
              :alt="location.image.alt_text || location.name"
              class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />

            <div
              v-else
              class="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100"
            >
              <Icon
                icon="lucide:image-off"
                class="h-10 w-10 text-slate-400"
              />
              <span class="text-xs font-medium text-slate-400">
                No image available
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-2">
            <h2
              class="line-clamp-1 font-montserrat text-xl font-bold text-slate-800 md:text-2xl"
            >
              {{ location.name }}
            </h2>

            <p
              class="line-clamp-3 font-roboto text-sm text-slate-600 md:text-base"
            >
              {{ location.description }}
            </p>
          </div>
        </article>
      </MotionWrapper>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="mx-auto my-12 flex w-full max-w-md flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center"
    >
      <div class="mb-4 rounded-full bg-amber-50 p-4 text-amber-600 shadow-sm">
        <Icon
          icon="lucide:map-pin-off"
          class="h-10 w-10"
        />
      </div>

      <h3 class="mb-1 text-lg font-semibold text-slate-800">
        No Locations Found
      </h3>

      <p class="max-w-xs text-sm text-slate-500">
        There are currently no locations available for this destination.
        Please check back later.
      </p>
    </div>
  </section>
</template>