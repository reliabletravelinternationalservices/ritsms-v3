<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import PackageCarousel from '@/components/PackageCarousel.vue'
import ValidToForeignBanner from '@/components/ValidToForeignBanner.vue'
import Button from '@/components/ui/button/Button.vue'
import { Package } from '@/types/package'

const props = withDefaults(defineProps<{ packages?: Package[], validOnlyForForeign?: boolean }>(), {
  packages: () => [],
  validOnlyForForeign: false
});

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
            <ValidToForeignBanner v-if="validOnlyForForeign" />
        </div>
      </div>

      <div class="flex justify-start md:justify-end">
        <span class="border-b border-1 border-[var(--secondary--custom)] text-base md:text-md lg:text-lg font-roboto font-bold text-[var(--secondary-custom)] hover:text-[var(--tertiary-hover-custom)] duration-75">
          <a :href="route('client.inbound')" target="_blank">
            <Button class="flex items-center whitespace-nowrap shadow-none rounded-none">
              Explore More 
              <Icon icon="ic:baseline-arrow-right-alt" width="26" height="26" class="ml-2  md:w-8 md:h-8" />
            </Button>
          </a>
        </span>
      </div>
    </div>

    <div class="w-full">
        <PackageCarousel :is-inbound="true"  :packages="props.packages" />
    </div>
  </section>
</template>