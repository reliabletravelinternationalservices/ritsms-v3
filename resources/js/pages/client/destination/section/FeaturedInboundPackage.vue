<script setup lang="ts">
import ExploreButton from '@/components/ExploreButton.vue';
import ImageDestinationCarousel from '@/components/ImageDestinationCarousel.vue';
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue';
import { Destination } from '@/types/destination';
import { Icon } from '@iconify/vue';

interface Props {
    destinations: Destination[]
}

const props = defineProps<Props>();

const phID = props.destinations.find(dest => dest.country.toLowerCase() === 'philippines')?.id || null;

</script>

<template>
    <section  class="relative flex overflow-hidden flex-col gap-4 items-center justify-center min-h-screen md:min-h-[700px] lg:min-h-[900px] py-12 px-4 md:px-6 bg-[var(--inbound-custom)]">
        <div class="max-w-5xl mx-auto relative z-10 flex flex-col gap-4 items-center justify-center py-16">
            <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div class="w-full md:w-2/3 space-y-2">
                    <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
                        <Icon icon="boxicons:plane-land-filled" width="28" height="28" class="md:w-7 md:h-7" />
                        <h2 class="font-bold font-roboto text-lg md:text-xl">INBOUND DESTINATIONS</h2>
                    </div>
                    <div class="space-y-3">
                        <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--primary-custom)] uppercase font-montserrat font-bold">
                            EXPLORE LOCAL SPOT HERE IN THE PHILIPPINES
                        </h1>
                        <p class="font-roboto text-sm md:text-base text-[var(--primary-custom)]">
                            Crystal clear waters, majestic cliffs, and endless sunshine. Your ultimate Philippine adventure starts right here.
                        </p>
                        <ValidToForeignBanner tag="VALID FOR FOREIGN ONLY!" />
                    </div>
                </div>

                <div class="flex justify-start md:justify-end">
                    <ExploreButton title="Explore More" :href="phID ? route('client.destination.country.destination', {destination: phID}) : '#'" class="font-bold text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] border-[var(--primary-custom)] hover:border-[var(--tertiary-custom)]" />
                </div>
            </div>

            <ImageDestinationCarousel :destinations="props.destinations" :is-philippines-only="true" />
        </div>
        
        <span class="absolute top-5 left-2 -rotate-45 z-0 pointer-events-none opacity-10">
            <Icon icon="mdi:location" class="w-32 h-32 md:w-96 md:h-96 text-[var(--shadow-custom)]" />
        </span>

        <span class="absolute -bottom-20 -right-20 -rotate-45 z-0 pointer-events-none opacity-10">
            <Icon icon="material-symbols-light:globe" class="w-32 h-32 md:w-96 md:h-96 text-[var(--shadow-custom)]" />
        </span>
    </section>
</template>