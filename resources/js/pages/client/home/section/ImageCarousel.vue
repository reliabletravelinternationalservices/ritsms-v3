<script setup lang="ts">

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

// UTILS
import { scrollToSection } from '@/lib/utils'

// CONSTANTS
import { HERO_CAROUSEL_IMAGES } from '../constants'


const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 8000,
  slideEffect: 'fade' as const,
  touchDrag: true 
}




</script>

<template>
 <section class="relative group/main overflow-hidden w-full"> 
    <div class="w-full h-full bg-black/70 absolute top-0 left-0 z-10 flex items-center justify-center flex-col gap-6 md:gap-8 px-4 text-center">
        <div class="space-y-3">
            <h1 class="text-3xl md:text-4xl lg:text-5xl text-[var(--primary-custom)] uppercase font-montserrat font-bold tracking-wider leading-tight">
                Discover <br class="block md:hidden" /> The World With Us
            </h1>
            <p class="text-[var(--primary-custom)] text-base md:text-lg lg:text-xl tracking-wider font-roboto opacity-90">
                Your trusted Philippine travel agency for inbound & outbound tours
            </p>
        </div>
        
        <Button 
          type="button" 
          class="transition-transform duration-300 h-11 md:h-12 px-6 md:px-8 hover:scale-105 bg-[var(--tertiary-custom)] font-medium hover:bg-[var(--tertiary-hover-custom)] rounded-none font-roboto"
          @click="scrollToSection('destinations')"
        >
            <span class="text-sm md:text-base">Explore Packages</span>
            <Icon icon="ep:arrow-right-bold" width="20" height="20" class="ml-2" aria-hidden="true" />
        </Button>
    </div>

    <Carousel v-bind="carouselConfig">
        <Slide v-for="(image, index) in HERO_CAROUSEL_IMAGES" :key="image.id">
            <div class="carousel__item w-full h-[450px] md:h-[600px] overflow-hidden">
                <img
                    :src="image.src"
                    :alt="image.alt"
                    :loading="index === 0 ? 'eager' : 'lazy'"
                    :fetchpriority="index === 0 ? 'high' : 'auto'"
                    decoding="async"
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