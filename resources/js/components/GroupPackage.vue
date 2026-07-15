<script setup lang="ts">
import ExploreButton from '@/components/ExploreButton.vue';
import PackageCarousel from '@/components/PackageCarousel.vue';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue';


const props = defineProps<{
    title: string
    description?: string | null
    isFeatured: boolean
    isInbound: boolean
    packages?: Package[] | null
    usdRate: number | null
    tag?: string | null
    href?: string
}>();



</script>

<template>
    <div class="flex flex-col items-start gap-4 py-12"
        :class="isFeatured ? 'border-b border-[var(--shadow-custom)]' : ''">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
            <div class="flex flex-col items-start gap-1 w-full sm:max-w-[70%] min-w-0">
                <p v-if="isFeatured" class="flex items-center gap-1 text-[var(--tertiary-custom)]">
                    <Icon icon="solar:pin-bold" width="24" height="24" class="shrink-0" aria-hidden="true" />
                    <span class="font-bold font-roboto text-md md:text-lg uppercase">FEATURED TOURS</span>
                </p>
                <h2 class="font-bold font-montserrat text-lg sm:text-xl md:text-2xl uppercase leading-snug line-clamp-2 break-words w-full">
                    {{ title }}
                </h2>
                <p v-if="description" class="font-roboto text-sm md:text-base line-clamp-2 break-words w-full">{{ description }}</p>
                <ValidToForeignBanner v-if="tag" :tag="tag" />
            </div>
            <span v-if="href" class="shrink-0 w-[110px] sm:w-auto">
                <ExploreButton title="Explore More" :href="href" class="w-[110px]  sm:w-auto" />
            </span>
        </div>
        <div class="w-full">
            <PackageCarousel v-if="packages" :packages="props.packages ?? []" :is-inbound="isInbound"
                :usd-rate="usdRate" />
            <span v-else
                class="flex flex-col items-center justify-center gap-2 w-full h-24 bg-[var(--outbound-opacity-custom-10)] rounded-lg">
                <span
                    class="flex items-center justify-center rounded-full bg-[var(--primary-custom)] text-white w-12 h-12">
                    <Icon icon="material-symbols:search-rounded" width="24" height="24" aria-hidden="true" />
                </span>
                <p class="font-bold text-sm uppercase tracking-[0.08em] text-[var(--primary-custom)]">No packages found
                </p>
                <p class="font-roboto text-sm text-[var(--muted-custom)] text-center">This package group has no packages
                    matching the selected filter.</p>
            </span>
        </div>
    </div>
</template>