<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import PackageCarousel from '@/components/PackageCarousel.vue'
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue'


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
    name: 'Beautiful Boracay Island', 
    price: 299, 
    duration: '3D2N', 
    destination: 'Boracay, Philippines', 
    description: 'Experience the world-famous white sand beaches and crystal clear waters of Boracay. Perfect for water sports and vibrant nightlife.', 
    image_path: 'https://whatmegdidnext.com/wp-content/uploads/2022/09/Boracay-beach-sign-widescreen.jpg' 
  },
  { 
    id: 2, 
    name: 'Baguio City Adventure', 
    price: 150, 
    duration: '2D1N', 
    destination: 'Baguio, Philippines', 
    description: 'Escape the heat and enjoy the pine-scented breeze of the Summer Capital. Visit Mines View Park and the Strawberry Farm.', 
    image_path: 'https://static.tripzilla.ph/media/92692/conversions/free-tourist-spots-baguio-w1024.webp' 
  },
  { 
    id: 3, 
    name: 'Beauty of Siargao', 
    price: 350, 
    duration: '4D3N', 
    destination: 'Siargao, Philippines', 
    description: 'The surfing capital of the Philippines. Explore Cloud 9, Magpupungko Rock Pools, and breathtaking island hopping tours.', 
    image_path: 'https://thehappytrip.com/wp-content/uploads/2017/02/CLUB-TARA.jpg' 
  },
  { 
    id: 4, 
    name: 'El Nido Palawan Paradise', 
    price: 499, 
    duration: '5D4N', 
    destination: 'Palawan, Philippines', 
    description: 'Discover the limestone karst landscapes and hidden lagoons of El Nido. A true paradise for nature lovers and snorkelers.', 
    image_path: 'https://static.wixstatic.com/media/43ce38_7b5e680ade144bafa2619f37a89636a4~mv2.jpg/v1/fill/w_528,h_396,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/43ce38_7b5e680ade144bafa2619f37a89636a4~mv2.jpg' 
  },
  { 
    id: 5, 
    name: 'Beauty & Culture of Cebu City', 
    price: 220, 
    duration: '3D2N', 
    destination: 'Cebu, Philippines', 
    description: 'A mix of historical landmarks and modern city life. Visit Magellan’s Cross before heading to the beautiful beaches of Mactan.', 
    image_path: 'https://www.beyondmydoor.com/wp-content/uploads/2024/02/Cebu-Taoist-Temple-Cebu-City-Philippines-1024x683.webp' 
  },
  { 
    id: 6, 
    name: 'Ilocos Cultural Experience', 
    price: 180, 
    duration: '3D2N', 
    destination: 'Vigan & Laoag, Philippines', 
    description: 'Step back in time at Calle Crisologo and explore the Paoay Sand Dunes and historical Spanish colonial churches.', 
    image_path: 'https://nicosbound.weebly.com/uploads/8/1/3/8/8138094/1_orig.jpg' 
  }
]
</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[900px] py-12 px-4 md:px-6">
    
    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      
      <div class="w-full md:w-1/2 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="icon-park-solid:local" width="28" height="28" class="md:w-7 md:h-7" />
          <h2 class="font-bold font-roboto text-lg md:text-xl">INBOUND TOURS</h2>
        </div>
        <div class="space-y-3">
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            THE PHILIPPINE'S PARADISE ISLAND
          </h1>
          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            See why the Philippines is a top-voted global favorite. Pristine nature and warm hospitality are just a flight away.
          </p>
            <ValidToForeignBanner />
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
        <PackageCarousel :is-inbound="true"  :packages="packages" />
    </div>
  </section>
</template>