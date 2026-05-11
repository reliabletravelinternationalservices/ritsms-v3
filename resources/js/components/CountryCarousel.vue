<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import CountryCard from './CountryCard.vue'
import { Destination } from '@/types/destination'

interface Props {
  destinations: Destination[]
}

const props = defineProps<Props>();

const carouselRef = ref<InstanceType<typeof Carousel> | null>(null)

const carouselConfig = {
  itemsToShow: 1,
  itemsToScroll: 1,
  gap: 10,
  clamp: true,
  mouseDrag: true,

  breakpoints: {
    // Tablet (approx 768px)
    768: {
      itemsToShow: 2,
      itemsToScroll: 1,
      gap: 10,
      mouseDrag: true,
    },
    // Desktop (approx 1024px)
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
    <Carousel ref="carouselRef" v-bind="carouselConfig" class="w-full">
      <Slide v-for="destination in props.destinations" :key="destination.id">
        <CountryCard :destination="destination" :href="route('client.destination.country.destination', { destination: destination.id})" />
      </Slide>

      <template #addons>
        <Navigation class="hidden md:block">
          <template #prev>
            <div class="h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100">
              <Icon icon="material-symbols:keyboard-arrow-left" width="24" height="24" class="text-[var(--primary-custom)]" />
            </div>
          </template>
          <template #next>
            <div class="h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100">
              <Icon icon="material-symbols:keyboard-arrow-right" width="24" height="24" class="text-[var(--primary-custom)]" />
            </div>
          </template>
        </Navigation>
        
        <Pagination />
      </template>
    </Carousel>
</template>

<style scoped>
:deep(.carousel__viewport) {
  height: 100%;
}

:deep(.carousel__track) {
  margin: 0;
}

:deep(.carousel__pagination) {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 0;
  width: 100%;
  justify-content: center;
}

:deep(.carousel__pagination-button) {
  width: 30px; /* Slightly smaller for mobile */
  height: 4px;
  background-color: var(--shadow-custom, #e5e7eb);
  border-radius: 0px;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  :deep(.carousel__pagination-button) {
    width: 50px;
  }
}

:deep(.carousel__pagination-button--active) {
  background-color: var(--secondary-custom, #3b82f6);
}

:deep(.carousel__pagination-button::after) {
  display: none;
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