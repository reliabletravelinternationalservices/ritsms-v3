<script setup lang="ts">
import ImageDestinationCarousel from '@/components/ImageDestinationCarousel.vue';
import { Icon } from '@iconify/vue';

interface DestubationItem {
  id: number
  name: string
  images: Array<string>
}


const destinations: DestubationItem[] = [
  { 
    id: 1, 
    name: 'Europe', 
    images: [
        'https://blog.dookinternational.com/images/post-media/ulQFe1712299016.jpg',
        'https://i.ytimg.com/vi/BZLZyX3JdEM/maxresdefault.jpg',
        'https://avkasholidays.wordpress.com/wp-content/uploads/2015/06/eiffel-tower-paris-france-01.jpg',
    ] 
  },
  { 
    id: 2, 
    name: 'Japan', 
    images: [
        'https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock601341215huge-1675509836757.jpg',
        'https://ik.imagekit.io/tvlk/blog/2024/10/Screenshot-2024-10-08-at-15.40.25-1024x674.jpg?tr=q-70,c-at_max,w-1000,h-600',
        'https://ik.imagekit.io/tvlk/blog/2024/04/shutterstock_2295299767.jpg?tr=q-70,c-at_max,w-1000,h-600',
    ] 
   },
  { 
    id: 3, 
    name: 'South Korea', 
    images: [
        'https://ik.imagekit.io/tvlk/blog/2025/01/Screenshot-2025-01-07-at-00.24.37.jpg?tr=q-70,c-at_max,w-1000,h-600',
        'https://www.onthegotours.com/repository/Gyeongbokgung-palace-in-autumn-Seoul--South-Korea--On-The-Go-Tours-324891477495442.jpg',
        'https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/things-to-do-in-south-korea-1533196984-785X440.jpg',
    ] 
  },
  { 
    id: 4, 
    name: 'Vietnam', 
    images: [
        'https://media.viacation.com/blogs/ce6721c4cbae4110ae0c7.jpg',
        'https://static.toiimg.com/photo/110640920.cms',
        'https://www.crazysexyfuntraveler.com/wp-content/uploads/2018/11/The-magical-Halong-Bay.jpg',
    ] 
  },
]

</script>

<template>
    <section  class="relative flex overflow-hidden flex-col gap-4 items-center justify-center min-h-screen md:min-h-[700px] lg:min-h-[900px] py-12 px-4 md:px-6 bg-[var(--outbound-custom)]">
        <div class="max-w-5xl mx-auto relative z-10 flex flex-col gap-4 items-center justify-center py-16">
            <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div class="w-full md:w-2/3 space-y-2">
                    <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
                        <Icon icon="fa7-solid:plane-departure" width="28" height="28" class="md:w-7 md:h-7" />
                        <h2 class="font-bold font-roboto text-lg md:text-xl">OUTBOUND DESTINATIONS</h2>
                    </div>
                    <div class="space-y-3">
                        <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--primary-custom)] uppercase font-montserrat font-bold">
                            EXPLORE INTERNATIONAL DESTINATIONS WITH US
                        </h1>
                        <p class="font-roboto text-sm md:text-base text-[var(--primary-custom)]">
                            Cross borders and create memories. Experience seamless international travel to the world's most sought-after hidden gems and vibrant cities.
                        </p>
                    </div>
                </div>

                <div class="flex justify-start md:justify-end">
                    <span class="border-b border-1 border-[var(--primary-custom)] text-base md:text-md lg:text-lg font-roboto font-bold text-[var(--primary-custom)] hover:text-[var(--tertiary-hover-custom)] hover:border-[var(--tertiary-hover-custom)] duration-75">
                        <a href="#">
                            <button class="flex items-center whitespace-nowrap">
                            Explore More 
                            <Icon icon="ic:baseline-arrow-right-alt" width="26" height="26" class="ml-2  md:w-8 md:h-8" />
                            </button>
                        </a>
                    </span>
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