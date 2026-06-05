<script setup lang="ts">
import { formatCurrency, getSeasonColor } from '@/lib/utils';
import { Package } from '@/types/package';
import { MapPin, Star } from 'lucide-vue-next';

interface Props {
    package: Package
}

defineProps<Props>();

</script>

<template>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-800">
        <div>
            <div class="flex flex-wrap items-center gap-2 mb-2">
                <span v-if="package.is_featured"
                    class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400">
                    <Star class="w-3 h-3 fill-current" /> Featured
                </span>
                <span v-if="package.is_foreign_only"
                    class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    Foreigners Only
                </span>
                <span
                    :class="['text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize', getSeasonColor(package.season)]">
                    {{ package.season }}
                </span>
                <span v-if="package.tag"
                    class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                    {{ package.tag }}
                </span>
            </div>
            <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{{ package.name }}</h1>
            <p class="flex items-center gap-1.5 text-sm text-zinc-500 mt-2 dark:text-zinc-400">
                <MapPin class="w-4 h-4" /> {{ package.destination }}
            </p>
        </div>

        <!-- Summary Quick Actions / Meta Pricing -->
        <div class="bg-zinc-50 p-4 rounded-xl border flex items-center gap-6 dark:bg-zinc-900 dark:border-zinc-800">
            <div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Base Price</p>
                <p class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{{
                    formatCurrency(Number(package.base_price), 'PHP', 2) }}</p>
            </div>
            <div class="border-l pl-6 dark:border-zinc-800">
                <p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Down Payment</p>
                <p v-if="package.down_payment && package.down_payment > 0"
                    class="text-lg font-semibold text-zinc-700 dark:text-zinc-300">{{
                        formatCurrency(Number(package.down_payment), 'PHP', 2) }}</p>
                <p v-else class="text-lg font-semibold text-zinc-700 dark:text-zinc-300">N/A</p>
            </div>
        </div>
    </div>
</template>