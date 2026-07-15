<script setup lang="ts">
import DestinationDropdownBreadcrumb from '@/components/DestinationDropdownBreadcrumb.vue';
import { scrollToSection } from '@/lib/utils';
import { BreadcrumbItemType } from '@/types';
import { Icon } from '@iconify/vue';
import { INBOUND_HERO_IMAGE } from '../constants';

const breadcrumbItems: BreadcrumbItemType[] = [
  { title: 'Home', href: route('client.landing') },
  {
    title: 'Inbound', href: route('client.inbound'), dropdown: [
      {
        label: 'Outbound', action: () => {
          window.location.href = route('client.outbound');
        }
      },
    ]
  },
]

</script>

<template>
  <section class="w-full h-auto min-h-[400px] md:h-[400px] lg:h-[500px] relative overflow-hidden flex">
    <div class="w-full h-full absolute top-0 left-0">
      <img class="w-full h-full object-cover"
        :src="INBOUND_HERO_IMAGE"
        alt="Local travel destinations for inbound tour packages in the Philippines">

      <span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-end justify-start">
        <div class="max-w-3xl flex flex-col items-start gap-6 md:gap-8 p-6 md:p-12 text-[var(--primary-custom)]">

          <span class="flex flex-col items-start justify-start gap-3">
            <div class="w-full">
              <DestinationDropdownBreadcrumb :items="breadcrumbItems" />
            </div>

            <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-extralight uppercase">
              EXPLORE <span class="font-extrabold">LOCAL DESTINATIONS IN THE</span> PHILIPPINES
            </h1>

            <p class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed">
              Crystal clear waters, majestic cliffs, and endless sunshine. Your ultimate Philippine adventure starts
              right here.
            </p>
          </span>

          <div class="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto">
            <button @click="scrollToSection('inbound-package-display')"
              class="w-full sm:w-auto bg-[var(--primary-opacity-custom)] border-2 border-[var(--primary-custom)] text-[var(--primary-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--primary-custom)] hover:text-[var(--muted-custom)] hover:border-[var(--primary-custom)] transition-all duration-200">
              <span class="whitespace-nowrap uppercase">Discover Now</span>
              <Icon icon="formkit:arrowright" width="26" height="26" aria-hidden="true" />
            </button>
          </div>
        </div>
      </span>
    </div>
  </section>
</template>