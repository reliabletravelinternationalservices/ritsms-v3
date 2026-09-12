<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'
import {  CountryWithLocations } from '@/types/country'
import { getImageUrl } from '@/lib/utils'

interface Props {
  countries: CountryWithLocations[]
}

const props = withDefaults(defineProps<Props>(), {
  countries: () => [],
})

/* =========================
   STATE
========================= */
const selectedImage = ref(0)

const carouselRef = ref<InstanceType<typeof Carousel> | null>(null)
const carouselRef2 = ref<InstanceType<typeof Carousel> | null>(null)

/* =========================
   SAFE SELECT HANDLER
========================= */
const selectDestination = (index: number) => {
  selectedImage.value = index

  ;(carouselRef2.value as any)?.slideTo(0)
  ;(carouselRef.value as any)?.slideTo(index)
}

/* =========================
   AUTO FIX INDEX (IMPORTANT)
   prevents crash when filtering changes
========================= */
watch(() => props.countries, (newList) => {
  if (selectedImage.value >= newList.length) {
    selectedImage.value = 0
  }
})

/* =========================
   MAIN CAROUSEL CONFIG
========================= */
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

/* =========================
   THUMBNAIL CAROUSEL CONFIG
========================= */
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

    <!-- =========================
         MAIN CAROUSEL
    ========================== -->
    <Carousel ref="carouselRef2" v-bind="carouselConfig2" class="w-full">
      <Slide
        v-for="(loc, index) in countries[selectedImage]?.locations || []"
        :key="index"
      >
        <div class="group relative h-[300px] w-full overflow-hidden md:h-[500px] rounded-lg">
          <img
            v-if="loc.image"
            :src="getImageUrl(loc.image.file_path)"
            :alt="loc.image.alt_text || loc.name"
            class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

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

          <!-- Dark overlay -->
          <div
            class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50"
          ></div>

          <!-- Location Name -->
          <div
            class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <h3
              class="translate-y-4 transform px-6 text-center text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-0 uppercase font-montserrat tracking-wider"
            >
              {{ loc.name }}
            </h3>
            <p class="translate-y-4 transform px-6 text-center text-white transition-all duration-300 group-hover:translate-y-0 text-sme max-w-[70%]">{{ loc.description }}</p>
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

      </template>
    </Carousel>

    <!-- =========================
         THUMBNAIL CAROUSEL
    ========================== -->
    <Carousel ref="carouselRef" v-bind="carouselConfig" class="w-full mt-3">
      <Slide
        v-for="(destination, index) in countries"
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
            v-if="destination.image"
            :src="getImageUrl(destination.image.file_path)"
            :alt="destination.image?.alt_text || destination.country + ' travel destination'"
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