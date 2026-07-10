<script setup lang="ts">

// COMPONENTS
import { Icon } from '@iconify/vue'

// CONSTANTS
import { AGENCY_SERVICES } from '../constants';
</script>

<template>
    <section class="flex flex-col items-center justify-center h-auto min-h-screen md:min-h-[700px] lg:min-h-[800px] w-full bg-black/5 p-8 md:p-0">
        <div class=" max-w-5xl h-min">
            <div class="w-full flex flex-col items-center gap-12 md:gap-16">
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <div class="flex items-end gap-2 text-[var(--tertiary-custom)]">
                        <Icon icon="material-symbols:room-service" width="28" height="28" class="md:w-7 md:h-7" aria-hidden="true"/>
                        <p class="font-bold font-roboto text-lg md:text-xl uppercase">OUR SERVICES</p>
                    </div>
                    
                    <div class="space-y-3">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                            Your Journey, Our Priority
                        </h2>
                        <p class="text-base md:text-lg tracking-wide font-roboto text-[var(--muted-custom)] italic">
                            "Connecting the Philippines to the World, and the World to the Philippines."
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">

                    <template v-for="service in AGENCY_SERVICES" :key="service.id">
                        <div class="flex flex-col items-center text-center group">
                            <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                                <Icon :icon="service.icon" class="w-10 h-10 md:w-12 md:h-12" aria-hidden="true"/>
                            </div>
                            <div class="space-y-2">
                                <h3 class="font-bold font-roboto text-lg md:text-xl">{{ service.name }}</h3>
                                <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                    {{ service.description }}
                                </p>
                            </div>
                        </div>
                    </template>                     
                </div>
            </div>
        
        </div>
        
    </section>
</template>