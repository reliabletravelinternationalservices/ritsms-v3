<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

interface DestubationItem {
  id: number
  name: string
  images: Array<string>
}

interface Props {
  destinations?: DestubationItem[]
}

const props = withDefaults(defineProps<Props>(), {
  destinations: () => []
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
        v-for="(destimage, index) in props.destinations[selectedImage]?.images"
        :key="index"
      >
        <div class="h-[300px] md:h-[500px] w-full relative">
          <img
            :src="destimage"
            :alt="props.destinations[selectedImage]?.name"
            class="w-full h-full object-cover object-center"
          />
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
        v-for="(destination, index) in props.destinations"
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
              {{ destination.name }}
            </span>
          </div>

          <!-- image -->
          <img
            :src="destination.images[0]"
            :alt="destination.name"
            class="w-full h-full object-cover"
          />
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