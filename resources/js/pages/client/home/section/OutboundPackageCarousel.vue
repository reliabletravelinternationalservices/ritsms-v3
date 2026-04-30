<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import PackageCarousel from '@/components/PackageCarousel.vue'
import { Button } from '@/components/ui/button'


interface Package {
  id: number
  name: string
  price: number
  description: string
  duration: string
  destination: string
  image_path: string
}


const packages: Package[] = [
  { 
    id: 1, 
    name: '5D4N Hanoi-Sapa-Halong with Airfare', 
    price: 58999, 
    duration: '5D4N', 
    destination: 'Vietnam', 
    description: 'Explore the mist-covered mountains of Sapa, the bustling streets of Hanoi, and cruise through the majestic limestone pillars of Halong Bay.', 
    image_path: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800' 
  },
  { 
    id: 2, 
    name: 'Experience Winter Korea', 
    price: 57520, 
    duration: '4D2N', 
    destination: 'Seoul, South Korea', 
    description: 'Immerse yourself in a winter wonderland. Visit Nami Island, experience traditional culture at Gyeongbokgung Palace, and enjoy shopping in Myeongdong.', 
    image_path: 'https://www.remotelands.com/remotenew1/dist/images/country/south_korea/city/128/b130110007.jpg' 
  },
  { 
    id: 3, 
    name: 'Hokkaido Christmas Winter', 
    price: 62999, 
    duration: '4D3N', 
    destination: 'Hokkaido, Japan', 
    description: 'Celebrate a magical Christmas in Hokkaido. Enjoy the finest powder snow, relaxing hot springs (Onsen), and the famous Otaru Canal lights.', 
    image_path: 'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2023-11/winter-attractions-japan.jpg?itok=aVWWdNq0' 
  },
  { 
    id: 4, 
    name: 'Swiss Alps Spectacular', 
    price: 89999, 
    duration: '6D5N', 
    destination: 'Lucerne & Zermatt, Switzerland', 
    description: 'A premium journey through the heart of the Alps. Featuring panoramic train rides, chocolate tasting, and views of the iconic Matterhorn.', 
    image_path: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&w=800' 
  },
  { 
    id: 5, 
    name: 'Parisian Dreams & Culture', 
    price: 69999, 
    duration: '5D4N', 
    destination: 'Paris, France', 
    description: 'Discover the City of Light. Visit the Eiffel Tower, the Louvre Museum, and enjoy a romantic sunset cruise along the River Seine.', 
    image_path: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800' 
  },
  { 
    id: 6, 
    name: 'Bali Spiritual Escape', 
    price: 52945, 
    duration: '4D3N', 
    destination: 'Ubud & Seminyak, Indonesia', 
    description: 'Find your zen in Bali. Tour the lush rice terraces of Tegallalang, visit sacred monkey forests, and relax on the pristine beaches of Uluwatu.', 
    image_path: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800' 
  }
]

</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[900px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-1/2 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="material-symbols:globe" width="24" height="24" class="md:w-7 md:h-7" />
          <h2 class="font-bold font-roboto text-lg md:text-xl">OUTBOUND TOURS</h2>
        </div>
        <div class="space-y-3">
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            EXPLORE THE WORLD WITH US
          </h1>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
              Experience the beauty of Asia, Europe, and our very own islands. We bring the world’s most loved spots right to your feet.
          </p>
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
        <span class="border-b border-1 border-[var(--secondary--custom)] text-base md:text-md lg:text-lg font-roboto font-bold text-[var(--secondary-custom)] hover:text-[var(--tertiary-hover-custom)] duration-75">
          <a href="#">
            <Button class="flex items-center whitespace-nowrap shadow-none">
              Explore More 
              <Icon icon="ic:baseline-arrow-right-alt" width="26" height="26" class="ml-2  md:w-8 md:h-8" />
            </Button>
          </a>
        </span>
      </div>
    </div>

    <div class="w-full">
        <PackageCarousel :is-inbound="false" :packages="packages" />
    </div>
  </section>
</template>