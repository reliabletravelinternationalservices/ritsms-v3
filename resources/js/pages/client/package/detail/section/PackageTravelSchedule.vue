<script setup lang="ts">
import { ref, computed } from 'vue';
import Banner from '@/components/Banner.vue';
import { cn, formatCurrency } from '@/lib/utils';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[], isInbound: boolean, usdRate: number }>();

const showAll = ref(false);
const visibleSchedules = computed(() => {
  const schedules = props.package.schedules || [];
  return showAll.value ? schedules : schedules.slice(0, 3);
});
</script>

<template>
  <section v-if="props.package.schedules && props.package.schedules.length > 0" class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-3 sm:p-4 rounded-lg" :class="cn(isInbound? 'bg-[var(--inbound-opacity-custom-10)]' : 'bg-[var(--outbound-opacity-custom-10)]')">
      <h4 class="font-bold font-roboto text-sm md:text-lg">TRAVEL SCHEDULE</h4>
      
      <div class="w-full flex flex-col gap-2">
        <transition-group name="list" tag="div" class="space-y-3 md:space-y-2">
          <div 
            v-for="schedule in visibleSchedules" 
            :key="schedule.id" 
            class="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4 px-2 py-2 sm:py-0 border-b border-black/5 sm:border-none last:border-none transition-all duration-100 ease-in"
          >
            <h5 class="col-span-1 font-roboto font-bold text-sm sm:text-base flex flex-wrap items-center gap-1">
              {{ new Date(schedule.departure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              <span class="text-xs sm:text-sm italic text-[var(--warning-custom)] font-roboto block sm:inline" v-if="schedule.is_limited">
                /Limited Slot Only!
              </span>
            </h5>
            
            <div class="col-span-1 flex justify-start sm:justify-center w-full">
              <Banner :title="schedule.is_available ? 'Available' : 'Sold Out'" :class="schedule.is_available ? 'bg-[var(--correct-custom)]' : 'bg-red-500'" class="w-auto" />
            </div>
            
            <span class="col-span-1 font-roboto font-bold text-[var(--warning-custom)] text-left sm:text-end text-sm sm:text-base">
              {{ formatCurrency(props.isInbound? (schedule.price/props.usdRate) : schedule.price, props.isInbound? 'USD' : 'PHP') }}/pax
            </span>
          </div>
        </transition-group>
        
        <span v-if="(props.package.schedules || []).length > 3" class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer self-start mt-1" @click="showAll = !showAll">
          {{ showAll ? 'Hide all' : 'Show more...' }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 220ms ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
/* Removed 'height' transitions from raw CSS classes to prevent modern rendering jump/stutter on flex items */
.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>