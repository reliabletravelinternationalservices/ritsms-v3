<script setup lang="ts">
import ExploreButton from '@/components/ExploreButton.vue';
import PackageCarousel from '@/components/PackageCarousel.vue';
import { Button } from '@/components/ui/button';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';


const props = defineProps<{
    title: string
    description?: string | null
    isFeatured: boolean
    isInbound: boolean
    packages?: Package[] | null
    usdRate: number | null
    href?: string
}>();



</script>

<template>
    <div class="flex flex-col items-start gap-4 py-12 " 
        :class="isFeatured ? 'border-b border-[var(--shadow-custom)]' : ''">
        <div class="flex items-end justify-between w-full">
            <div class="flex flex-col items-start gap-1 w-2/3">
                <span v-if="isFeatured" class="flex items-center gap-1 text-[var(--tertiary-custom)]">
                    <Icon icon="solar:pin-bold" width="24" height="24" />
                    <span class="font-bold font-roboto text-md md:text-lg uppercase">FEATURED TOURS</span>
                </span>
                <h1 class="font-bold font-montserrat text-xl md:text-2xl uppercase">{{ title }}</h1>
                <p v-if="description" class="font-roboto text-sm md:text-base">{{ description }}</p>
            </div>
            <span v-if="href">
                <ExploreButton title="Explore All" :href="href"/>
            </span>
        </div>
        <div class="w-full">
            <PackageCarousel v-if="packages" :packages="props.packages ?? []" :is-inbound="isInbound" :usd-rate="usdRate" />
            <span v-else class="flex flex-col items-center justify-center gap-2 w-full h-10 bg-[var(--outbound-opacity-custom-10)]">
                <p  class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">No packages found</p>
            </span>
        </div>
    </div>
</template>
