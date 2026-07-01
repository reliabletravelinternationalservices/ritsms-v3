<script setup lang="ts">

import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { type Destination } from '@/types/destination';
import { Head } from '@inertiajs/vue3';
import DestinationTable from '@/components/table/destinations/DestinationTable.vue';
import StatsCard from '@/components/statistic/StatsCard.vue';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Destinations',
        href: route('admin.destinations'),
    },
];

interface Props {
    destinations: Destination[];
    stats: {
        total_destinations: number;
        total_locations: number;
        total_listed_countries: number;
    };
}

defineProps<Props>();


</script>

<template>
    <Head title="Service Countries" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative">
                    <StatsCard
                        title="Displayed Destinations"
                        :value="stats.total_destinations"
                        icon="majesticons:map-simple-destination-line"
                        :delay="0.5"
                    />
                </div>
                <div class="relative">
                    <StatsCard
                        title="Total Countries"
                        :value="stats.total_listed_countries"
                        icon="boxicons:location"
                        :delay="0.5"
                    />
                </div>
                <div class="relative">
                    <StatsCard
                        title="Featured Locations"
                        :value="stats.total_locations"
                        icon="mingcute:mountain-2-line"
                        :delay="0.5"
                    />
                </div>
            </div>
            <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <DestinationTable :destinations="destinations" />
            </div>
        </div>
    </AppLayout>
</template>
