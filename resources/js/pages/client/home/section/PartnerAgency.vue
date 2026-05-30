<script setup lang="ts">
const appUrl = import.meta.env.VITE_APP_URL;

const partnerAgencies = [
    {
        name: 'Department of Tourism',
        logo: `${appUrl}/storage/upload/agency/pa_dot.png`,
        alt: 'Department of Tourism',
    },
    {
        name: 'TPB',
        logo: `${appUrl}/storage/upload/agency/pa_tpb.png`,
        alt: 'TPB',
    },
    {
        name: 'RTAA',
        logo: `${appUrl}/storage/upload/agency/pa_rtaa.png`,
        alt: 'RTAA',
    },
    {
        name: 'NITAS',
        logo: `${appUrl}/storage/upload/agency/pa_nitas.png`,
        alt: 'NITAS',
    },
    {
        name: 'TBA',
        logo: `${appUrl}/storage/upload/agency/pa_tba.png`,
        alt: 'TBA',
    },
];
</script>

<template>
    <section class="flex flex-col items-center justify-center py-12 md:py-20 w-full border-y border-[var(--shadow-custom)] px-4">
        <div class="max-w-5xl w-full">
            <div class="w-full flex flex-col items-center gap-8 md:gap-12">
                
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                        Our Accreditation & Partnerships
                    </h1>
                    <p class="text-sm md:text-base font-roboto text-[var(--muted-custom)]">
                        We are proud to be accredited by the following organizations, reflecting our commitment to quality and excellence in travel services.
                    </p>
                </div>

                <div v-if="partnerAgencies.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 w-full">
                    
                    <template v-for="(agency, index) in partnerAgencies" :key="index">
                       <div class="aspect-square p-4 flex items-center justify-center border border-[var(--shadow-custom)] rounded-lg hover:shadow-lg hover:border-[var(--tertiary-custom)] transition-all duration-300 group">
                            <img :src="agency.logo" 
                                 :alt="agency.alt"
                                class="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                    </template>
                    
                </div>
            </div>
        </div>
    </section>
</template>