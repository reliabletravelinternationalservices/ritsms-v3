<script setup lang="ts">
import ExploreButton from '@/components/ExploreButton.vue';
import ImageDestinationCarousel from '@/components/ImageDestinationCarousel.vue';
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue';
import { Icon } from '@iconify/vue';

interface DestubationItem {
  id: number
  name: string
  images: Array<string>
}


const destinations: DestubationItem[] = [
  { 
    id: 1, 
    name: 'Boracay', 
    images: [
        'https://www.travelandtourworld.com/wp-content/uploads/2025/07/Boracays-White-Beach.jpg',
        'https://www.exploreshaw.com/wp-content/uploads/2019/04/DSCF9807.jpg',
        'https://lh4.googleusercontent.com/YzSscGxPCL74oOAQTBFdjZor8jFPdn-XtVTuFwDJmKrTqsZxQ0DnNHFogWSBRquTv1bKkA_suLix8nw1qcTGJ_F4wvSIHK5E2780BMFSQ7Bml5NAWdMs-_3uF2wsEOO9KySm71dWLItbSVVPdQ',
    ] 
  },
  { 
    id: 2, 
    name: 'Palawan', 
    images: [
        'https://philippinetourismusa.com/wp-content/uploads/2019/05/palawan-slider-min.jpg',
        'https://thehappytrip.com/wp-content/uploads/2018/08/1024px-Puerto_Princesa_Subterranean_River_National_park_01.jpg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cb/a6/63/re-discovering-my-fave.jpg?w=1200&h=700&s=1',
    ] 
   },
  { 
    id: 3, 
    name: 'Batangas', 
    images: [
        'https://thehappytrip.com/wp-content/uploads/2019/03/taal-3259871_960_720.jpg',
        'https://www.agoda.com/wp-content/uploads/2024/06/Featured-Tagaytay-Taal-Volcano-1244x700.jpg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/c3/1a/96/what-a-beautiful-sunny.jpg?w=500&h=-1&s=1',
    ] 
  },
  { 
    id: 4, 
    name: 'Baguio', 
    images: [
        'https://thehappytrip.com/wp-content/uploads/2015/02/21034288_10154874698388017_8994094350056208787_n.jpg',
        'https://static.tripzilla.ph/media/92692/conversions/free-tourist-spots-baguio-w1024.webp',
        'https://www.brittany.com.ph/wp-content/uploads/2023/05/Igorot-Stone-Kingdom.jpg',
    ] 
  },
]

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
                        <ValidToForeignBanner />
                    </div>
                </div>

                <div class="flex justify-start md:justify-end">
                    <ExploreButton title="Explore More" href="#" class="font-bold text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] border-[var(--primary-custom)] hover:border-[var(--tertiary-custom)]" />
                </div>
            </div>

            <ImageDestinationCarousel :destinations="destinations" />
        </div>
        
        <span class="absolute top-5 left-2 -rotate-45 z-0 pointer-events-none opacity-10">
            <Icon icon="mdi:location" class="w-32 h-32 md:w-96 md:h-96 text-[var(--shadow-custom)]" />
        </span>

        <span class="absolute -bottom-20 -right-20 -rotate-45 z-0 pointer-events-none opacity-10">
            <Icon icon="material-symbols-light:globe" class="w-32 h-32 md:w-96 md:h-96 text-[var(--shadow-custom)]" />
        </span>
    </section>
</template>