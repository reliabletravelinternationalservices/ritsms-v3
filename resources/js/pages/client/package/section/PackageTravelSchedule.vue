<script setup lang="ts">
import { ref, computed } from 'vue';
import Banner from '@/components/Banner.vue';
import { formatCurrency } from '@/lib/utils';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

const showAll = ref(false);

const visibleSchedules = computed(() => {
  const schedules = props.package.schedules || [];
  return showAll.value ? schedules : schedules.slice(0, 3);
});
</script>

<template>
  <section v-if="props.package.schedules && props.package.schedules.length > 0" class="w-full h-auto relative overflow-hidden p-4">
        <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-1 bg-[var(--outbound-opacity-custom-10)] p-4">
            <h4 class="font-bold font-roboto text-md md:text-lg">TRAVEL SCHEDULE</h4>
            <div class="w-full flex flex-col gap-2">
                <transition-group name="list" tag="div" class="space-y-2">
                    <div v-for="schedule in visibleSchedules" :key="schedule.id" class="grid grid-cols-3 px-2 transition-all duration-100 ease-in">
                        <h5 class="col-span-1 font-roboto font-bold">{{ new Date(schedule.departure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}/<span class="text-sm italic text-[var(--warning-custom)] font-roboto" v-if="schedule.is_limited">Limited Slot Only!</span></h5>
                        <Banner class="col-span-1" :title="schedule.is_available ? 'Available' : 'Unavailable'" :class="schedule.is_available ? 'bg-[var(--correct-custom)]' : 'bg-red-500'" />
                        <span class="col-span-1 font-roboto font-bold text-[var(--warning-custom)]">{{ formatCurrency(schedule.price, 'PHP') }}/pax</span>
                    </div>
                </transition-group>
                <span v-if="(props.package.schedules || []).length > 3" class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer" @click="showAll = !showAll">{{ showAll ? 'Hide all' : 'Show more...' }}</span>
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
  height: 0;
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
  height: auto;
}
</style>