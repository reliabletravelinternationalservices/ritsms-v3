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
                <ValidToForeignBanner v-if="tag" :tag="tag" />
            </div>
            <span v-if="href">
                <ExploreButton title="Explore All" :href="href" />
            </span>
        </div>
        <div class="w-full">
            <PackageCarousel v-if="packages" :packages="props.packages ?? []" :is-inbound="isInbound"
                :usd-rate="usdRate" />
            <span v-else
                class="flex flex-col items-center justify-center gap-2 w-full h-24 bg-[var(--outbound-opacity-custom-10)] rounded-lg">
                <span
                    class="flex items-center justify-center rounded-full bg-[var(--primary-custom)] text-white w-12 h-12">
                    <Icon icon="material-symbols:search-rounded" width="24" height="24" />
                </span>
                <p class="font-bold text-sm uppercase tracking-[0.08em] text-[var(--primary-custom)]">No packages found
                </p>
                <p class="font-roboto text-sm text-[var(--muted-custom)] text-center">This package group has no packages
                    matching the selected filter.</p>
            </span>
        </div>
    </div>
</template>
