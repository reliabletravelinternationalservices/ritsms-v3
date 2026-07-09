<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Package } from '@/types/package'
import PackageCard from './PackageCard.vue'

interface Props {
  isInbound: boolean
  packages?: Package[]
}

const props = withDefaults(defineProps<Props>(), {
  isInbound: false,
  packages: () => []
})


const screenWidth = ref(0)

onMounted(() => {
  screenWidth.value = window.innerWidth
  const updateWidth = () => {
    screenWidth.value = window.innerWidth
  }
  window.addEventListener('resize', updateWidth)
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })
})

const showNavigation = computed(() => {
  const len = props.packages.length
  if (screenWidth.value < 768) return len > 1 // Mobile: show if more than 1 package
  if (screenWidth.value < 1024) return len > 2 // Tablet: show if more than 2 packages
  return len > 3 // Desktop: show if more than 3 packages
})

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
      clamp: false,
      mouseDrag: false,
    },
  },
}
</script>

<template>
  <Carousel v-bind="carouselConfig" class="w-full">
    <Slide v-for="packageData in props.packages" :key="packageData.id">
      <PackageCard :package="packageData" :isInbound="props.isInbound"/>
    </Slide>

    <template #addons>
      <Navigation v-if="showNavigation" class="hidden md:block ">
        <template #prev>
          <div
            class="md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100">
            <Icon icon="material-symbols:keyboard-arrow-left" width="24" height="24" class="text-white" />
          </div>
        </template>
        <template #next>
          <div
            class="md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100">
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
  padding: 5px;
  /* Adds space between cards */
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