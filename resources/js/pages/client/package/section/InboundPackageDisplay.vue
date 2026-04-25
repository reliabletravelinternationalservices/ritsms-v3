<script setup lang="ts">
import GroupPackage from './GroupPackage.vue'
import InboundFilter from './InboundFilter.vue'




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
    price: 340, 
    duration: '5D4N', 
    destination: 'Boracay', 
    description: 'Discover the beauty of Boracay Island. Explore the lush tropical forests, relax on the white sandy beaches, and experience the vibrant culture of the island.', 
    image_path: 'https://cdn.sanity.io/images/nxpteyfv/goguides/e3aa344049e8f48f8bd038baad9d88ddd9732fdc-1600x1066.jpg' 
  },
  { 
    id: 2, 
    name: 'Baguio City Adventure', 
    price: 430, 
    duration: '4D2N', 
    destination: 'Baguio', 
    description: 'Experience the cool mountain air of Baguio City. Visit the famous Burnham Park, explore the vibrant night market, and enjoy the scenic views from Mines View Park.', 
    image_path: 'https://media.interaksyon.com/wp-content/uploads/2022/07/Igorot-Stone-Kingdom.jpg' 
  },
  { 
    id: 3, 
    name: 'Beauty of Siargao', 
    price: 600, 
    duration: '4D3N', 
    destination: 'Siargao', 
    description: 'Experience the beauty of Siargao Island. Explore the lush tropical forests, relax on the white sandy beaches, and experience the vibrant culture of the island.', 
    image_path: 'https://travelrebels.com/wp-content/uploads/2025/04/wat-te-doen-in-siargao-filipijnen.jpg' 
  },
  { 
    id: 4, 
    name: 'Coron Palawan Beauty', 
    price: 89999, 
    duration: '6D5N', 
    destination: 'Coron, Palawan', 
    description: 'Discover the stunning beauty of Coron. Dive into crystal-clear lagoons, explore vibrant coral reefs, and relax on pristine beaches surrounded by limestone cliffs.', 
    image_path: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/e7/b0/ea/photo0jpg.jpg?w=1200&h=700&s=1' 
  },
  { 
    id: 5, 
    name: 'Cebu City Adventure', 
    price: 399, 
    duration: '5D4N', 
    destination: 'Cebu', 
    description: 'Explore the vibrant city of Cebu. Visit the historic Magellan\'s Cross, the beautiful Taoist Temple, and enjoy the local cuisine.', 
    image_path: 'https://www.beyondmydoor.com/wp-content/uploads/2024/02/Cebu-Taoist-Temple-Cebu-City-Philippines-1024x683.webp' 
  },
  { 
    id: 6, 
    name: 'Ilocos Norte Escape', 
    price: 520, 
    duration: '4D3N', 
    destination: 'Ilocos Norte', 
    description: 'Experience the charm of Ilocos Norte. Explore the historic sites, enjoy the local cuisine, and relax on the beautiful beaches.', 
    image_path: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/44/bb/25/saud-beach.jpg?w=1200&h=700&s=1' 
  }
]

</script>

<template>
    <section class="w-full">
        <div class="max-w-5xl m-auto py-8">
            <GroupPackage
                title="RECOMMENDED BY TOURISTS" 
                description="See why the Philippines is a top-voted global favorite. Pristine nature and warm hospitality are just a flight away" 
                :packages="packages" 
                :is-featured="true" 
                :is-inbound="true"
            />


            <div class="w-full py-12 mt-4">
                <InboundFilter />
                <GroupPackage
                    title="SUMMER VACATION IN THE PHILIPPINES" 
                    description="See why the Philippines is a top-voted global favorite. Pristine nature and warm hospitality are just a flight away." 
                    :packages="packages" 
                    :is-featured="false" 
                    :is-inbound="true"
                />
                <GroupPackage
                    title="PHILIPPINE BAUTIFUL BEACHES" 
                    description="See why the Philippines is a top-voted global favorite. Pristine nature and warm hospitality are just a flight away." 
                    :packages="packages" 
                    :is-featured="false"
                    :is-inbound="true"
                />
            </div>
        </div>
    </section>
</template>
