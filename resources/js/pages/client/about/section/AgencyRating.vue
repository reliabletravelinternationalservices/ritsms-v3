<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <section class="w-full py-12">
        <div class="max-w-5xl m-auto grid grid-cols-2 lg:grid-cols-4 w-full gap-y-8 lg:gap-y-0">
            <div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2">
                <Icon icon="lucide:circle-star" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
                <span class="flex flex-col">
                    <h4 class="font-bold font-montserrat text-xl md:text-3xl">17+</h4>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">Years of Experience</p>
                </span>
            </div>
            <div class="flex items-center justify-center lg:border-r-2 border-[var(--shadow-custom)] gap-2 px-2">
                <Icon icon="boxicons:plane-land" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
                <span class="flex flex-col">
                    <h4 class="font-bold font-montserrat text-xl md:text-3xl">1100+</h4>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">SUCCESS SERVICES</p>
                </span>
            </div>
            <div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2 mt-4 lg:mt-0">
                <Icon icon="mdi:emoticon-happy-outline" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
                <span class="flex flex-col">
                    <h4 class="font-bold font-montserrat text-xl md:text-3xl">100%</h4>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">TRUSTED BY CLIENT</p>
                </span>
            </div>
            <div class="flex items-center justify-center gap-2 px-2 mt-4 lg:mt-0">
                <Icon icon="material-symbols:reviews-outline" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
                <span class="flex flex-col">
                    <h4 class="font-bold font-montserrat text-xl md:text-3xl">90%</h4>
                    <p class="text-[10px] md:text-sm font-roboto uppercase">POSITIVE REVIEWS</p>
                </span>
            </div>
        </div>
    </section>
</template>