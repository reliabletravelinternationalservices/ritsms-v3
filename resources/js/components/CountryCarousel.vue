<script setup lang="ts">

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import CountryCard from './CountryCard.vue'

// TYPES
import { DestinationProps } from '@/pages/client/home/types.js'

// UTILS
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'


defineProps<DestinationProps>()

const windowWidth = ref(window.innerWidth)

const isDesktop = computed(() => windowWidth.value >= 768)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

const carouselConfig = {
  itemsToShow: 1,
  itemsToScroll: 1,
  gap: 10,
  clamp: true,
  mouseDrag: true,

  breakpoints: {
    768: {
      itemsToShow: 2,
      itemsToScroll: 1,
      gap: 10,
      mouseDrag: true,
    },
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
  <Carousel
    v-bind="carouselConfig"
    class="w-full relative"
  >
    <Slide
      v-for="destination in destinations"
      :key="destination.id"
    >
      <CountryCard
        :destination="destination"
        :href="route('client.destination.country.destination', { destination: destination.id })"
      />
    </Slide>

    <template #addons>
      <!-- NAVIGATION -->
      <Navigation class="hidden md:block">
        <template #prev>
          <div
            class="h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100"
          >
            <Icon
              icon="material-symbols:keyboard-arrow-left"
              width="24"
              height="24"
              class="text-[var(--primary-custom)]"
            />
          </div>
        </template>

        <template #next>
          <div
            class="h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100"
          >
            <Icon
              icon="material-symbols:keyboard-arrow-right"
              width="24"
              height="24"
              class="text-[var(--primary-custom)]"
            />
          </div>
        </template>
      </Navigation>

      <!-- PAGINATION (ONLY DESKTOP) -->
      <Pagination v-if="isDesktop" />
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

/* =========================
   PAGINATION STYLE
========================= */
:deep(.carousel__pagination) {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 6px;

  max-width: 90%;
  overflow: hidden;

  justify-content: center;
}

:deep(.carousel__pagination-button) {
  width: 18px;
  height: 4px;
  background-color: var(--shadow-custom, #e5e7eb);
  border-radius: 999px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

:deep(.carousel__pagination-button--active) {
  background-color: var(--secondary-custom, #3b82f6);
}

:deep(.carousel__pagination-button::after) {
  display: none;
}

/* =========================
   NAVIGATION
========================= */
:deep(.carousel__prev),
:deep(.carousel__next) {
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
}
</style>