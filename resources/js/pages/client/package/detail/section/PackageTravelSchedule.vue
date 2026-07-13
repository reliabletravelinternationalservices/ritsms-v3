<script setup lang="ts">
import { ref, computed } from 'vue';
import Banner from '@/components/Banner.vue';
import { cn, formatCurrency } from '@/lib/utils';
import { PackageDetailProps } from '../../types';
import { useCurrency } from '@/composables/useCurrency';

const { convertToUsd } = useCurrency();

const props = defineProps<PackageDetailProps>();

const showAll = ref(false);

const allSchedules = computed(() => props.package.schedules || []);
const hasMoreSchedules = computed(() => allSchedules.value.length > 3);
</script>

<template>
  <section v-if="package.schedules && package.schedules.length > 0" class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-3 sm:p-4 rounded-lg" :class="cn(isInbound? 'bg-[var(--inbound-opacity-custom-10)]' : 'bg-[var(--outbound-opacity-custom-10)]')">
      <h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Travel Schedule</h2>
      
      <div class="w-full flex flex-col gap-2">
        <ul class="space-y-3 md:space-y-2">
          <li 
            v-for="(schedule, index) in allSchedules" 
            :key="schedule.id" 
            class="schedule-item grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4 px-2 py-2 sm:py-0 border-b border-black/5 sm:border-none last:border-none"
            :class="(!showAll && index >= 3) ? 'schedule-collapsed' : 'schedule-expanded'"
          >
            <p class="col-span-1 font-roboto font-bold text-sm sm:text-base flex flex-wrap items-center gap-1">
              {{ new Date(schedule.departure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              <span class="text-xs sm:text-sm italic text-[var(--warning-custom)] font-roboto block sm:inline" v-if="schedule.is_limited">
                /Limited Slot Only!
              </span>
            </p>
            
            <div class="col-span-1 flex justify-start sm:justify-center w-full">
              <Banner :title="schedule.is_available ? 'Available' : 'Sold Out'" :class="schedule.is_available ? 'bg-[var(--correct-custom)]' : 'bg-red-500'" class="w-auto" />
            </div>
            
            <span class="col-span-1 font-roboto font-bold text-[var(--warning-custom)] text-left sm:text-end text-sm sm:text-base">
              {{ formatCurrency(isInbound? convertToUsd(schedule.price) : schedule.price, props.isInbound? 'USD' : 'PHP') }}/pax
            </span>
          </li>
        </ul>
        
        <span v-if="hasMoreSchedules" class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer self-start mt-1" role="button" :aria-expanded="showAll" @click="showAll = !showAll">
          {{ showAll ? 'Hide all' : 'Show more...' }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.schedule-item {
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.3s ease, transform 0.3s ease, padding 0.35s ease, margin 0.35s ease;
}

.schedule-expanded {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
}

.schedule-collapsed {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  border: none;
}
</style>