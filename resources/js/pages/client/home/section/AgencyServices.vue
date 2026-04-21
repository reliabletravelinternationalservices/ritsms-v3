<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <section class="flex flex-col items-center justify-center h-auto min-h-screen md:min-h-[700px] lg:min-h-[800px] w-full bg-black/5 p-8 md:p-0">
        <div class=" max-w-5xl h-min">
            <div class="w-full flex flex-col items-center gap-12 md:gap-16">
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <div class="flex items-end gap-2 text-[var(--tertiary-custom)]">
                        <Icon icon="material-symbols:room-service" width="28" height="28" class="md:w-7 md:h-7"/>
                        <h2 class="font-bold font-roboto text-lg md:text-xl uppercase">OUR SERVICES</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                            Your Journey, Our Priority
                        </h1>
                        <p class="text-base md:text-lg tracking-wide font-roboto text-[var(--muted-custom)] italic">
                            “Connecting the Philippines to the World, and the World to the Philippines.”
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
                    
                    <div class="flex flex-col items-center text-center group">
                        <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="material-symbols-light:person-pin-sharp" class="w-10 h-10 md:w-12 md:h-12"/>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-bold font-roboto text-lg md:text-xl">Domestic & International Ticketing</h3>
                            <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                Seamless flight bookings with the best routes and competitive fares for any destination.
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center text-center group">
                        <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="icon-park-solid:plan" class="w-10 h-10 md:w-12 md:h-12"/>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-bold font-roboto text-lg md:text-xl">Hotels & Resorts Booking</h3>
                            <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                Curated accommodations ranging from budget-friendly stays to 5-star luxury retreats.
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center text-center group">
                        <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="fontisto:passport-alt" class="w-10 h-10 md:w-12 md:h-12"/>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-bold font-roboto text-lg md:text-xl">Passporting | Visa Processing</h3>
                            <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                Expert assistance to handle your documentation and travel permits with ease and speed.
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center text-center group">
                        <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="ic:sharp-travel-explore" class="w-10 h-10 md:w-12 md:h-12"/>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-bold font-roboto text-lg md:text-xl">Tour Packages</h3>
                            <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                All-inclusive itineraries designed to showcase the best of the Philippines and the world.
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center text-center group">
                        <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="mdi:security" class="w-10 h-10 md:w-12 md:h-12"/>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-bold font-roboto text-lg md:text-xl">Travel Insurance</h3>
                            <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                Travel with peace of mind. Our insurance protects you from unexpected costs and emergencies.
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center text-center group">
                        <div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="mdi:boat" class="w-10 h-10 md:w-12 md:h-12"/>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-bold font-roboto text-lg md:text-xl">Cruises</h3>
                            <p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">
                                Sail away on luxury liners to the world’s most beautiful ports and coastal wonders.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        
        </div>
        
    </section>
</template>