<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { scrollToSection } from '@/lib/utils'

/**
 * 1. Define the Interface for Hero Images
 */
interface HeroImage {
  id: number
  src: string
}


const carouselRef = ref<InstanceType<typeof Carousel> | null>(null)


const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 8000,
  slideEffect: 'fade' as const,
  touchDrag: true 
}
const appUrl = import.meta.env.VITE_APP_URL

const images: HeroImage[] = [
  {
    id: 1,
    src: appUrl + '/storage/upload/agency/carousel_1.png',
  },
  {
    id: 2,
    src: appUrl + '/storage/upload/agency/carousel_2.png',
  },
  {
    id: 3,
    src: appUrl + '/storage/upload/agency/carousel_3.png',
  }
]


</script>

<template>
 <section class="relative group/main overflow-hidden w-full"> 
    <div class="w-full h-full bg-black/70 absolute top-0 left-0 z-10 flex items-center justify-center flex-col gap-6 md:gap-8 px-4 text-center">
        <div class="space-y-3">
            <h1 class="text-3xl md:text-4xl lg:text-5xl text-[var(--primary-custom)] uppercase font-montserrat font-bold tracking-wider leading-tight">
                DISCOVER THE <br class="block md:hidden" /> WORLD WITH US
            </h1>
            <p class="text-[var(--primary-custom)] text-base md:text-lg lg:text-xl tracking-wider font-roboto opacity-90">
                Reliable Journeys, Unforgettable Memories
            </p>
        </div>
        
        <Button 
          type="button" 
          class="transition-transform duration-300 h-11 md:h-12 px-6 md:px-8 hover:scale-105 bg-[var(--tertiary-custom)] font-medium hover:bg-[var(--tertiary-hover-custom)] rounded-none font-roboto"
          @click="scrollToSection('destinations')"
        >
            <span class="text-sm md:text-base">Explore More</span>
            <Icon icon="ep:arrow-right-bold" width="20" height="20" class="ml-2" />
        </Button>
    </div>

    <Carousel ref="carouselRef" v-bind="carouselConfig">
        <Slide v-for="image in images" :key="image.id">
            <div class="carousel__item w-full h-[450px] md:h-[600px] overflow-hidden">
                <img 
                    :src="image.src" 
                    alt="Travel Destination"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/main:scale-110"
                />
            </div>
        </Slide>
    </Carousel>
 </section>
</template>

<style scoped>
:deep(.carousel__viewport) {
  height: 100%;
}
:deep(.carousel__track) {
  height: 100%;
}
</style>