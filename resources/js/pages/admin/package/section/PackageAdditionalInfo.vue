<script setup lang="ts">
import { formatCurrency, getPackageDurationLabel } from '@/lib/utils';
import { Clock, CloudSun, DollarSign } from 'lucide-vue-next';

interface Props {
    duration: number;
    season: string;
    base_price: number;
}

defineProps<Props>();

</script>

<template>
    <div class="bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl p-5 space-y-4">
        <h3 class="font-semibold text-zinc-900 dark:text-zinc-50 border-b pb-2 dark:border-zinc-800">Package Details</h3>
        
        <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
                <span class="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><Clock class="w-4 h-4" /> Duration</span>
                <span class="font-medium text-zinc-900 dark:text-zinc-100">{{ getPackageDurationLabel(duration) }}</span>
            </div>

            <div class="flex items-center justify-between text-sm">
                <span class="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><CloudSun class="w-4 h-4" /> Season</span>
                <span class="font-medium capitalize text-zinc-900 dark:text-zinc-100">{{ season }}</span>
            </div>

            <div class="flex items-center justify-between text-sm">
                <span class="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><DollarSign class="w-4 h-4" /> Booking Fee</span>
                <span class="font-medium text-zinc-900 dark:text-zinc-100">{{ formatCurrency(base_price) }}</span>
            </div>
        </div>
    </div>
</template>