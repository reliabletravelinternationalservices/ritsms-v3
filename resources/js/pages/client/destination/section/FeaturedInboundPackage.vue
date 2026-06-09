<script setup lang="ts">
import ExploreButton from '@/components/ExploreButton.vue'
import ImageDestinationCarousel from '@/components/ImageDestinationCarousel.vue'
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue'
import { Destination } from '@/types/destination'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

interface Props {
  destinations: Destination[]
}

const props = defineProps<Props>()

/* =========================
   SAFE COMPUTED ID
========================= */
const phID = computed(() =>
  props.destinations?.find(
    (dest) => dest.country?.toLowerCase() === 'philippines'
  )?.id || null
)
</script>

<template>
  <section
    class="relative flex overflow-hidden flex-col gap-4 items-center justify-center
           min-h-[100vh] md:min-h-[700px] lg:min-h-[900px]
           py-10 md:py-12 px-4 md:px-6
           bg-[var(--inbound-custom)]"
  >
    <div
      class="w-full max-w-5xl mx-auto relative z-10
             flex flex-col gap-6 md:gap-4
             items-center justify-center py-10 md:py-16"
    >
      <!-- HEADER -->
      <div
        class="w-full flex flex-col md:flex-row
               md:items-end justify-between gap-6 md:gap-6"
      >
        <!-- TEXT SECTION -->
        <div class="w-full md:w-2/3 space-y-3 md:space-y-2">
          <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
            <Icon
              icon="boxicons:plane-land-filled"
              width="26"
              height="26"
              class="md:w-7 md:h-7"
            />
            <h2
              class="font-bold font-roboto
                     text-base sm:text-lg md:text-xl
                     leading-tight"
            >
              INBOUND DESTINATIONS
            </h2>
          </div>

          <div class="space-y-3 md:space-y-3">
            <h1
              class="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                     text-[var(--primary-custom)]
                     uppercase font-montserrat font-bold
                     leading-snug md:leading-tight"
            >
              EXPLORE LOCAL SPOT HERE IN THE PHILIPPINES
            </h1>

            <p
              class="font-roboto
                     text-sm md:text-base
                     text-[var(--primary-custom)]
                     leading-relaxed"
            >
              Crystal clear waters, majestic cliffs, and endless sunshine. Your ultimate Philippine adventure starts right here.
            </p>

            <ValidToForeignBanner tag="VALID FOR FOREIGN ONLY!" />
          </div>
        </div>

        <!-- BUTTON -->
        <div
          class="flex justify-start md:justify-end
                 w-full md:w-auto"
        >
          <ExploreButton
            title="Explore More"
            :href="phID ? route('client.destination.country.destination', { destination: phID }) : '#'"
            class="font-bold text-[var(--primary-custom)]
                   hover:text-[var(--tertiary-custom)]
                   border-[var(--primary-custom)]
                   hover:border-[var(--tertiary-custom)]"
          />
        </div>
      </div>

      <!-- CAROUSEL -->
      <ImageDestinationCarousel
        :destinations="props.destinations"
        :is-philippines-only="true"
      />
    </div>

    <!-- DECOR ICONS -->
    <span
      class="absolute top-5 left-2 -rotate-45 z-0 pointer-events-none opacity-10"
    >
      <Icon
        icon="mdi:location"
        class="w-24 h-24 sm:w-40 sm:h-40 md:w-96 md:h-96 text-[var(--shadow-custom)]"
      />
    </span>

    <span
      class="absolute -bottom-20 -right-20 -rotate-45 z-0 pointer-events-none opacity-10"
    >
      <Icon
        icon="material-symbols-light:globe"
        class="w-24 h-24 sm:w-40 sm:h-40 md:w-96 md:h-96 text-[var(--shadow-custom)]"
      />
    </span>
  </section>
</template>