<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'

// CONSTANTS
import { AGENCY_OFFER_IMAGE, AGENCY_BOOKING_PROCESS } from '../constants';

</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 items-center justify-center min-h-screen py-18 px-4 w-full">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div class="w-full space-y-4">
            <div class="flex items-center gap-1 text-[var(--tertiary-custom)]">
                <Icon icon="mdi:offer" width="24" height="24" class="md:w-7 md:h-7" aria-hidden="true" />
                <p class="font-bold font-roboto text-lg md:text-xl">HOW IT WORKS</p>
            </div>
            
            <div class="space-y-4">
                <div class="space-y-3">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
                        How Our Travel Booking Process Works
                    </h1>
                    <p class="font-roboto text-xs md:text-sm text-justify">
                        Booking your next trip with us is simple and stress-free. From your first inquiry to sealing the deal, our travel consultants guide you through every step of the process.
                    </p>
                </div>

                <div class="space-y-4 text-justify">
                    <template v-for="process in AGENCY_BOOKING_PROCESS" :key="process.step">
                        <div class="flex flex-col gap-1">
                            <span class="flex items-center gap-1">
                                <Icon icon="material-symbols:check" width="24" height="24" class="md:w-7 md:h-7 text-[var(--correct-custom)]" aria-hidden="true" />
                                <h3 class="font-roboto font-bold text-sm md:text-base text-[var(--secondary-custom)]">
                                    {{ process.title }}
                                </h3>
                            </span>
                            <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                                {{ process.description }}
                            </p>
                        </div>
                    </template>

                </div>
            </div>
        </div>

        <div class="w-full h-full">
            <img :src="AGENCY_OFFER_IMAGE" alt="Step-by-step travel booking process with Reliable International Travel Services" class="object-cover h-48 md:h-full w-full">
        </div>
    </div>
  </section>
</template>