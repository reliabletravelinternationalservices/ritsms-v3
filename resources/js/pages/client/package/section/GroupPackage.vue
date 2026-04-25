<script setup lang="ts">
import PackageCarousel from '@/components/PackageCarousel.vue';
import { Icon } from '@iconify/vue';


interface Package {
  id: number
  name: string
  price: number
  description: string
  duration: string
  destination: string
  image_path: string
}


defineProps<{
    title: string
    description: string
    isFeatured: boolean
    isInbound: boolean
    packages: Package[]
}>();



</script>

<template>
    <div class="flex flex-col items-start gap-2 py-12 " 
        :class="isFeatured ? 'border-b border-[var(--shadow-custom)]' : ''">
        <div class="flex flex-col items-start gap-1 w-2/3">
            <span v-if="isFeatured" class="flex items-center gap-1 text-[var(--tertiary-custom)]">
                <Icon icon="solar:pin-bold" width="24" height="24" />
                <span class="font-bold font-roboto text-md md:text-lg uppercase">FEATURED TOURS</span>
            </span>
            <h1 class="font-bold font-montserrat text-xl md:text-2xl uppercase">{{ title }}</h1>
            <p class="font-roboto text-sm md:text-base">{{ description }}</p>
        </div>
        <div class="w-full">
            <PackageCarousel :packages="packages" :is-inbound="isInbound" />
        </div>
    </div>
</template>
