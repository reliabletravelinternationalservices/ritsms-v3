<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { Destination } from '@/types/destination'
import { computed } from 'vue'


type Props = {
  destinations: Destination[]
  isPhilippinesOnly: boolean
}


const props = withDefaults(defineProps<Props>(), {
  destinations: () => [],
  isPhilippinesOnly: false
})


// ✅ Filtered Destinations logic
const filteredDestinations = computed(() => {
  if (props.isPhilippinesOnly) {
    return props.destinations.filter(
      (dest) => dest.country.toLowerCase() === 'philippines'
    )
  }
  return props.destinations
})


// ✅ active selected destination
const selectedImage = ref(0)

// refs
const carouselRef = ref<InstanceType<typeof Carousel> | null>(null)
const carouselRef2 = ref<InstanceType<typeof Carousel> | null>(null)

// ✅ select destination
const selectDestination = (index: number) => {
  selectedImage.value = index

  // ✅ fix TS error by casting
  ;(carouselRef2.value as any)?.slideTo(0)
  ;(carouselRef.value as any)?.slideTo(index)
}

// configs
const carouselConfig = {
  itemsToShow: 2,
  itemsToScroll: 1,
  gap: 10,
  clamp: true,
  mouseDrag: true,
  breakpoints: {
    768: {
      itemsToShow: 3.1,
      itemsToScroll: 1,
      gap: 10,
    },
    1024: {
      itemsToShow: 4.1,
      itemsToScroll: 2,
      gap: 15,
    },
  },
}

const carouselConfig2 = {
  itemsToShow: 1,
  itemsToScroll: 1,
  gap: 10,
  clamp: true,
  mouseDrag: false,
}
</script>

<template>
  <div class="w-full">
    <!-- ✅ MAIN CAROUSEL -->
    <Carousel ref="carouselRef2" v-bind="carouselConfig2" class="w-full">
      <Slide
        v-for="(destLocation, index) in filteredDestinations[selectedImage]?.locations"
        :key="index"
      >
        <div class="h-[300px] md:h-[500px] w-full relative">
          <img
            v-if="destLocation.image?.url"
            :src="destLocation.image.url"
            :alt="props.destinations[selectedImage]?.image.alt_text"
            class="w-full h-full object-cover object-center"
          />
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" />
          </div>  
        </div>
      </Slide>

      <template #addons>
        <Navigation class="hidden md:block">
          <template #prev>
            <div class="h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center">
              <Icon icon="material-symbols:keyboard-arrow-left" class="text-white" width="30" />
            </div>
          </template>
          <template #next>
            <div class="h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center">
              <Icon icon="material-symbols:keyboard-arrow-right" class="text-white" width="30" />
            </div>
          </template>
        </Navigation>

        <Pagination />
      </template>
    </Carousel>

    <!-- ✅ THUMBNAIL CAROUSEL -->
    <Carousel ref="carouselRef" v-bind="carouselConfig" class="w-full mt-3">
      <Slide
        v-for="(destination, index) in filteredDestinations"
        :key="destination.id"
      >
        <div
          @click="selectDestination(index)"
          class="h-[60px] md:h-[100px] w-full relative cursor-pointer overflow-hidden border-2 transition-all duration-200"
          :class="index === selectedImage
            ? 'border-[var(--tertiary-custom)]'
            : 'border-transparent'"
        >
          <!-- overlay -->
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span class="text-white text-xs md:text-sm font-bold uppercase border px-2 border-[var(--tertiary-custom)]">
              {{ destination.country }}
            </span>
          </div>

          <!-- image -->
          <img
            v-if="destination.image?.url"
            :src="destination.image?.url"
            :alt="destination.image.alt_text"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" />
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation class="hidden md:block">
          <template #prev>
            <div class="h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center">
              <Icon icon="material-symbols:keyboard-arrow-left" class="text-white" width="24" />
            </div>
          </template>
          <template #next>
            <div class="h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center">
              <Icon icon="material-symbols:keyboard-arrow-right" class="text-white" width="24" />
            </div>
          </template>
        </Navigation>
      </template>
    </Carousel>
  </div>
</template>