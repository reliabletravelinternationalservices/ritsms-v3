<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import CountryCarousel from '@/components/CountryCarousel.vue'


interface Destination {
  id: number
  name: string
  image_path: string
}


const images: Destination[] = [
  { id: 1, name: 'Europe', image_path: 'https://www.wendyperrin.com/wp-content/uploads/2016/11/Paris-Louvre-at-night-Pixabay-1000x667.jpg' },
  { id: 2, name: 'South Korea', image_path: 'https://hblimg.mmtcdn.com/content/hubble/img/countryimgs/mmt/destination/m_South_Korea_country_images_1_l_760_1139.jpg' },
  { id: 3, name: 'Japan', image_path: 'https://wanderlustcrew.com/wp-content/uploads/2023/03/Most-Beautiful-Places-in-Japan-Gion-District-Kyoto.jpeg' },
  { id: 4, name: 'Thailand', image_path: 'https://res.cloudinary.com/djcyhbk2e/image/upload/c_limit,f_auto,q_50,w_1400/v1/gvv/prod/nbd4splgceqppygu51jo' },
  { id: 5, name: 'Vietnam', image_path: 'https://www.outlooktravelmag.com/media/vietnam-1-1611926800.profileImage.2x-jpg-webp.webp' },
  { id: 6, name: 'Indonesia', image_path: 'https://imartevers.com/wp-content/uploads/2026/02/15486940194b45347ac5037248d2363d27dec5ad-1600x1066-1.jpg' }
]
</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[1100px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-1/2 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="mdi:compass" width="28" height="28" class="md:w-7 md:h-7" />
          <h2 class="font-bold font-roboto text-lg md:text-xl">FEATURED DESTINATIONS</h2>
        </div>
        <div class="space-y-3">
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            EXPLORE MOST VISIT PLACES
          </h1>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            Adventure awaits in every corner of the world! Dive into breathtaking views and unforgettable cultures with our top-rated travel spots.
          </p>
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
        <span class="border-b border-1 border-[var(--secondary--custom)] text-base md:text-md lg:text-lg font-roboto font-bold text-[var(--secondary-custom)] hover:text-[var(--tertiary-hover-custom)] duration-75">
          <a href="#">
            <button class="flex items-center whitespace-nowrap">
              Explore More 
              <Icon icon="ic:baseline-arrow-right-alt" width="26" height="26" class="ml-2  md:w-8 md:h-8" />
            </button>
          </a>
        </span>
      </div>
    </div>

    <div class="w-full">
      <CountryCarousel ref="carouselRef" :destinations="images"  />
    </div>
  </section>
</template>