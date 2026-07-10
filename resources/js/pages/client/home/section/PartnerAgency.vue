<script setup lang="ts">
import { PARTNER_AGENCIES } from '../constants';
</script>

<template>
    <section class="flex flex-col items-center justify-center py-12 md:py-20 w-full border-y border-[var(--shadow-custom)] px-4">
        <div class="max-w-5xl w-full">
            <div class="w-full flex flex-col items-center gap-8 md:gap-12">
                
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                        Accredited Travel Agency & Trusted Partnerships
                    </h2>
                    <p class="text-sm md:text-base font-roboto text-[var(--muted-custom)]">
                        Reliable International Travel Services is officially accredited by the Philippines' leading travel and tourism organizations. These partnerships reflect our commitment to safe, reliable, and quality travel planning for every destination we offer.
                    </p>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 w-full">
                    
                    <template v-for="(agency, index) in PARTNER_AGENCIES" :key="index">
                       <div class="aspect-square p-4 flex items-center justify-center border border-[var(--shadow-custom)] rounded-lg hover:shadow-lg hover:border-[var(--tertiary-custom)] transition-all duration-300 group">
                            <img :src="agency.logo" 
                                 :alt="agency.alt"
                                 loading="lazy"
                                class="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                    </template>
                    
                </div>
            </div>
        </div>
    </section>
</template>