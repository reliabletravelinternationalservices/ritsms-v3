<script setup lang="ts">
import DestinationDropdownBreadcrumb from '@/components/DestinationDropdownBreadcrumb.vue';
import { Icon } from '@iconify/vue';
import { router } from '@inertiajs/vue3';

interface BreadcrumbItemType {
  label: string
  href?: string
  dropdown?: { label: string; action: () => void }[]
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: route('client.destination') },
  { label: 'Outbound', href: route('client.outbound'), dropdown: [
    { label: 'Inbound', action: () => { router.visit(route('client.destination.inbound')) } },
  ]},
]
</script>

<template>
  <section class="w-full h-auto min-h-[400px] md:h-[400px] lg:h-[500px] relative overflow-hidden flex">
    <div class="w-full h-full absolute top-0 left-0">
      <img class="w-full h-full object-cover" src="https://media.cnn.com/api/v1/images/stellar/prod/220922155226-japan-tourism-lifting-covid-restrictions.jpg?c=16x9&q=h_833,w_1480,c_fill" alt="Traveler">
      
      <span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-end justify-start">
        <div class="max-w-3xl flex flex-col items-start gap-6 md:gap-8 p-6 md:p-12 text-[var(--primary-custom)]">

          <span class="flex flex-col items-start justify-start gap-3">
            <div class="w-full">
              <DestinationDropdownBreadcrumb :items="breadcrumbItems" />
            </div> 
            
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-extralight uppercase">
              EXPLORE <span class="font-extrabold">INTERNATIONAL DESTINATIONS</span> WITH US
            </h1>
            
            <p class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed">
              Cross borders and create memories. Experience seamless international travel to the world's most sought-after hidden gems and vibrant cities
            </p>
          </span>

          <div class="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto">
            <a href="" class="w-full sm:w-auto">
              <button class="w-full sm:w-auto bg-[var(--primary-opacity-custom)] border-2 border-[var(--primary-custom)] text-[var(--primary-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--primary-custom)] hover:text-[var(--muted-custom)] hover:border-[var(--primary-custom)] transition-all duration-200">
                <span class="whitespace-nowrap uppercase">Discover Now</span>
                <Icon icon="formkit:arrowright" width="26" height="26" />
              </button>
            </a>
          </div>
        </div>
      </span>
    </div>
  </section>
</template>