<script setup lang="ts">
import { formatDateString, packageSellingStatus } from '@/lib/utils';

interface Props {
    selling_start_date?: string;
    selling_end_date: string;
}

defineProps<Props>();

</script>

<template>
    <div class="bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl p-5 space-y-4">
        <span class="flex items-center justify-between border-b pb-2 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-zinc-50 ">Selling Period</h3>
            <span class="text-xs text-zinc-500 dark:text-zinc-400">{{ packageSellingStatus(selling_end_date) }}</span>
        </span>

        <div class="space-y-3">
            <div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400">Starts Selling On</p>
                <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{{ formatDateString(selling_start_date) }}</p>
            </div>
            <div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400">Closes/Ends On</p>
                <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{{ formatDateString(selling_end_date) }}</p>
            </div>
        </div>
    </div>
</template>