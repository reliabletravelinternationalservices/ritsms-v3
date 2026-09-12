<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { AGENCY_RATINGS } from '../../home/constants';
</script>

<template>
    <section class="w-full py-12">
        <div class="max-w-5xl m-auto grid grid-cols-2 lg:grid-cols-4 w-full gap-y-8 lg:gap-y-0">
            <div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2">
                <Icon :icon="AGENCY_RATINGS.experience.icon" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" aria-hidden="true" />
                <span class="flex flex-col">
                    <p class="font-bold font-montserrat text-xl md:text-3xl">{{ AGENCY_RATINGS.experience.value }}+</p>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">{{ AGENCY_RATINGS.experience.label }}</p>
                </span>
            </div>
            <div class="flex items-center justify-center lg:border-r-2 border-[var(--shadow-custom)] gap-2 px-2">
                <Icon :icon="AGENCY_RATINGS.tour.icon" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" aria-hidden="true" />
                <span class="flex flex-col">
                    <p class="font-bold font-montserrat text-xl md:text-3xl">{{AGENCY_RATINGS.tour.value.toLocaleString() }}+</p>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">{{ AGENCY_RATINGS.tour.label }}</p>
                </span>
            </div>
            <div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2 mt-4 lg:mt-0">
                <Icon :icon="AGENCY_RATINGS.client.icon" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" aria-hidden="true" />
                <span class="flex flex-col">
                    <p class="font-bold font-montserrat text-xl md:text-3xl">{{AGENCY_RATINGS.client.value.toLocaleString() }}+</p>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">{{ AGENCY_RATINGS.client.label }}</p>
                </span>
            </div>
            <div class="flex items-center justify-center gap-2 px-2 mt-4 lg:mt-0">
                <Icon :icon="AGENCY_RATINGS.review.icon" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" aria-hidden="true" />
                <span class="flex flex-col">
                    <p class="font-bold font-montserrat text-xl md:text-3xl">{{AGENCY_RATINGS.review.value }}/5</p>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">{{ AGENCY_RATINGS.review.label }}</p>
                </span>
            </div>
        </div>
    </section>
</template>