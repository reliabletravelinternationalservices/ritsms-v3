<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatCurrency, getPackageDurationLabel } from '@/lib/utils'
import { Link } from '@inertiajs/vue3'
import { Package } from '@/types/package'
import { clamp } from 'node_modules/radix-vue/dist/shared'

interface Props {
  isInbound: boolean
  packages?: Package[]
}

const props = withDefaults(defineProps<Props>(), {
  isInbound: false,
  packages: () => []
})

const carouselRef = ref<InstanceType<typeof Carousel> | null>(null)

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
    <Carousel ref="carouselRef" v-bind="carouselConfig" class="w-fit">
      <Slide v-for="packageData in props.packages" :key="packageData.id">
        <Link :href="route('client.package.detail', { package: packageData })" class="carousel__item">
            <div class=" h-auto md:h-[400px] max-w-[320px] flex flex-col md:grid md:grid-rows-2 border border-[var(--shadow-custom)] overflow-hidden bg-white">
              
              <div class="relative h-[180px] md:h-full">
                <img 
                  v-if="packageData.primary_image"
                  :src="packageData.primary_image.url" 
                  :alt="packageData.name"
                  class="w-full h-full object-cover"
                />
                <div 
                  v-else
                  class="w-full h-full bg-gray-200 flex items-center justify-center"
                >
                  <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" />
                </div>
                <span v-if="packageData.tag != null" class="bg-black/50 flex items-center justify-center absolute top-0 left-0 py-1 px-4 text-[var(--primary-custom)] font-roboto m-2 text-[10px] md:text-xs">
                  {{ packageData.tag }}
                </span>
              </div>

              <div class="p-3 md:p-4 flex flex-col justify-between text-left">
                  <div>
                      <div class="flex items-center justify-between mb-2">
                          <span 
                            class="font-bold font-roboto text-[10px] md:text-xs text-[var(--primary-custom)] py-1 px-3 inline-block"
                            :class="isInbound ? 'bg-[var(--inbound-custom)]' : 'bg-[var(--outbound-custom)]'"
                          >
                            {{ getPackageDurationLabel(packageData.duration) }}
                          </span>
                          <span class="flex items-center space-x-1 text-[10px] md:text-xs font-roboto"
                          :class="isInbound ? 'text-[var(--inbound-custom)]' : 'text-[var(--outbound-custom)]'">
                            <Icon icon="mdi:map-marker" width="16" height="16" />
                            <span class="truncate max-w-[100px] md:max-w-none">{{ packageData.destination }}</span>
                          </span>
                      </div>

                      <div class="flex flex-col">
                          <h1 class="text-lg font-bold text-[var(--color-dark)] line-clamp-1">
                            {{ packageData.name }}
                          </h1>
                          <h4 class="font-medium font-roboto text-[10px] md:text-sm text-[var(--muted-custom)] mb-4">
                            from <span class="font-bold text-[var(--warning-custom)] text-sm md:text-lg">{{ formatCurrency(packageData.base_price, isInbound? 'USD' : 'PHP') }}/pax</span>
                          </h4>
                          <p class="font-roboto text-[11px] md:text-sm line-clamp-2 text-gray-600">{{ packageData.description }}</p>
                      </div>
                  </div>
              </div>
            </div>
        </Link>
      </Slide>

      <template #addons>
        <Navigation v-if="showNavigation" class="hidden md:block ">
          <template #prev>
            <div class="md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100">
              <Icon icon="material-symbols:keyboard-arrow-left" width="24" height="24" class="text-white" />
            </div>
          </template>
          <template #next>
            <div class="md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100">
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