<script setup lang="ts">
import PackageCarousel from '@/components/PackageCarousel.vue';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';


const props = defineProps<{
    title: string
    description?: string | null
    isFeatured: boolean
    isInbound: boolean
    packages?: Package[] | null
    usdRate: number | null
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
            <p v-if="description" class="font-roboto text-sm md:text-base">{{ description }}</p>
        </div>
        <div class="w-full">
            <PackageCarousel v-if="packages" :packages="props.packages ?? []" :is-inbound="isInbound" :usd-rate="usdRate" />
            <span v-else class="flex flex-col items-center justify-center gap-2 w-full h-10 bg-[var(--outbound-opacity-custom-10)]">
                <p  class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">No packages found</p>
            </span>
        </div>
    </div>
</template>
