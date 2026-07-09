<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Package } from '@/types/package';
import { formatCurrency, getPackageDurationLabel } from '@/lib/utils';
import { useCurrency } from '@/composables/useCurrency';

const { convertToUsd } = useCurrency();

defineProps<{
  package: Package,
  isInbound: boolean
}>();
</script>

<template>
  <a
    :href="isInbound ? route('client.inbound.package.detail', { slug: package.slug }) : route('client.outbound.package.detail', { slug: package.slug })"
    class="carousel__item group">
    
    <div
      class="h-auto md:h-[400px] max-w-[320px] flex flex-col md:grid md:grid-rows-2 border border-[var(--shadow-custom)] overflow-hidden bg-white transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-gray-300">

      <div class="relative h-[180px] md:h-full overflow-hidden">
        <img v-if="package.primary_image && package.primary_image.url" :src="package.primary_image.url"
          :alt="package.name" class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
        
        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
          <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" />
        </div>
        <span v-if="package.tag != null"
          class="bg-black/50 flex items-center justify-center absolute top-0 left-0 py-1 px-4 text-[var(--primary-custom)] font-roboto m-2 text-[10px] md:text-xs">
          {{ package.tag }}
        </span>
      </div>

      <div class="p-3 md:p-4 flex flex-col justify-between text-left">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span
              class="font-bold font-roboto text-[10px] md:text-xs text-[var(--primary-custom)] py-1 px-3 inline-block"
              :class="isInbound ? 'bg-[var(--inbound-custom)]' : 'bg-[var(--outbound-custom)]'">
              {{ getPackageDurationLabel(package.duration) }}
            </span>
            <span class="flex items-center space-x-1 text-[10px] md:text-xs font-roboto"
              :class="isInbound ? 'text-[var(--inbound-custom)]' : 'text-[var(--outbound-custom)]'">
              <Icon icon="mdi:map-marker" width="16" height="16" />
              <span class="truncate max-w-[100px] md:max-w-none">{{ package.destination }}</span>
            </span>
          </div>

          <div class="flex flex-col">
            <h1 class="text-lg font-bold text-[var(--color-dark)] line-clamp-1">
              {{ package.name }}
            </h1>
            <h4 class="font-medium font-roboto text-[10px] md:text-sm text-[var(--muted-custom)] mb-4">
              from <span class="font-bold text-[var(--warning-custom)] text-sm md:text-lg">{{ formatCurrency(isInbound ? convertToUsd(package.base_price) : package.base_price, isInbound ? 'USD' : 'PHP') }}/pax</span>
            </h4>
            <p class="font-roboto text-[11px] md:text-sm line-clamp-2 text-gray-600">{{ package.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>