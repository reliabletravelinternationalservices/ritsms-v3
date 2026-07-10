<script setup lang="ts">

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'

// TYPES
import { ImageProps } from '@/pages/client/home/types'

// CONSTANTS
import { CLIENT_FEEDBACK } from '@/pages/client/home/constants'

interface Props {
  feedbacks: ImageProps[]
}

defineProps<Props>()

const carouselConfig = {
  itemsToShow: 1,
  itemsToScroll: 1,
  gap: 10,
  clamp: true,
  mouseDrag: true,

  breakpoints: {
    // Tablet
    768: {
      itemsToShow: 2,
      itemsToScroll: 1,
      gap: 10,
    },
    // Desktop
    1024: {
      itemsToShow: 3.1,
      itemsToScroll: 2,
      gap: 15,
      mouseDrag: false,
    },
  },
}
</script>

<template>
    <Carousel v-bind="carouselConfig" class="w-full">
      <Slide v-for="feedback in feedbacks" :key="feedback.id">
        <div class="carousel__item h-[400px] w-full relative">
          <img 
            :src="feedback.src" 
            :alt="feedback.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation class="hidden md:block">
          <template #prev>
            <div class="h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100">
              <Icon icon="material-symbols:keyboard-arrow-left" width="24" height="24" class="text-white" />
            </div>
          </template>
          <template #next>
            <div class="h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100">
              <Icon icon="material-symbols:keyboard-arrow-right" width="24" height="24" class="text-white" />
            </div>
          </template>
        </Navigation>
      </template>
    </Carousel>
</template>

<style scoped>
:deep(.carousel__viewport) {
  height: 100%;
}

:deep(.carousel__slide) {
  padding: 5px; /* Adds space between cards */
}

/* Ensure navigation arrows are visible but don't break layout */
:deep(.carousel__prev),
:deep(.carousel__next) {
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
}
</style>