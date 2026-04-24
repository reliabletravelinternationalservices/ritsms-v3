<script setup lang="ts">
import { Icon } from '@iconify/vue';
import OutboundFilter from './OutboundFilter.vue';
import GroupPackage from './GroupPackage.vue';


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
    <section class="w-full">
        <div class="max-w-5xl m-auto">
            <GroupPackage
                title="READY TO GO TRAVELS" 
                description="Experience the beauty of Asia, Europe, and our very own islands. We bring the world’s most loved spots right to your feet" 
                :packages="packages" 
                :is-featured="true" 
            />


            <div class="w-full py-12 mt-4">
                <OutboundFilter />
                <GroupPackage
                    title="ENJOY YOUR WINTER" 
                    description="Experience the beauty of Asia, Europe, and our very own islands. We bring the world’s most loved spots right to your feet" 
                    :packages="packages" 
                    :is-featured="false" 
                />
                <GroupPackage
                    title="AUTUMN VACATION DESTINATIONS" 
                    description="Experience the beauty of Asia, Europe, and our very own islands. We bring the world’s most loved spots right to your feet" 
                    :packages="packages" 
                    :is-featured="false" 
                />
            </div>
        </div>
    </section>
</template>
