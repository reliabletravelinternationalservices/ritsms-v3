<script setup lang="ts">

import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Package } from '@/types/package';
import { Head } from '@inertiajs/vue3';

import PackageTable from '@/components/table/package/PackageTable.vue';
import StatsCard from '@/components/statistic/StatsCard.vue';
import { computed } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Packages',
        href: route('admin.packages'),
    },
];

interface CombinedPageProps {
    packages: Package[];
    metrics: {
        total_packages: number;
        packages_trend: number;
        average_price: number;
        foreign_exclusive_count: number;
    };
}

// 3. Fire defineProps exactly ONCE using withDefaults for fallback states
const props = withDefaults(defineProps<CombinedPageProps>(), {
    packages: () => [],
    metrics: () => ({
        total_packages: 0,
        packages_trend: 0,
        average_price: 0.00,
        foreign_exclusive_count: 0
    })
});

const packageTrendType = computed(() => {
    if (props.metrics.packages_trend > 0) return 'up'
    if (props.metrics.packages_trend < 0) return 'down'
    return 'neutral'
})

</script>

<template>
    <Head title="Service Packages" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative h-auto">
                     <StatsCard
                        title="Total products"
                        :value="props.metrics.total_packages"
                        icon="iconoir:package"
                        :trend-value="`${metrics.packages_trend}%`"
                        :trend-type="packageTrendType"
                    />
                </div>
                <div class="relative h-auto">
                    <PlaceholderPattern />
                </div>
                <div class="relative h-auto">
                    <PlaceholderPattern />
                </div>
            </div>
            <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <PackageTable :packages="packages" />
            </div>
        </div>
    </AppLayout>
</template>
