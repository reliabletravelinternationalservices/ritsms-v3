<script setup lang="ts">
import SummaryCard from '@/components/statistic/SummaryCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import MonthlyInquiriesChart, { type ChartDataPoint } from '@/components/statistic/MonthlyInquiriesChart.vue';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
];

interface Props {
    dashboardData: {
        packages_count: number;
        destinations_count: number;
        inquiries_count: number;
        collections_count: number;
        bookings_count: number;
    }
}

const props = withDefaults(defineProps<Props>(), {
    dashboardData: () => ({
        packages_count: 143,
        destinations_count: 58,
        inquiries_count: 895,
        collections_count: 12,
        bookings_count: 0
    })
});


const dummyInquiries: ChartDataPoint[] = [
    { month: 'Jan', count: 78 },
    { month: 'Feb', count: 92 },
    { month: 'Mar', count: 124 },
    { month: 'Apr', count: 110 },
    { month: 'May', count: 156 },
    { month: 'Jun', count: 182 },
    { month: 'Jul', count: 165 },
    { month: 'Aug', count: 190 },
    { month: 'Sep', count: 210 },
    { month: 'Oct', count: 185 },
    { month: 'Nov', count: 220 },
    { month: 'Dec', count: 245 }
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
            <div class="grid auto-rows-min gap-4 md:grid-cols-5">
                <div class="relative">
                    <SummaryCard
                        title="Packages"
                        :value="props.dashboardData.packages_count"
                        icon="iconoir:package"
                        trend-value="12%"
                        trend-type="up"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Destinations"
                        :value="props.dashboardData.destinations_count"
                        icon="iconoir:maps-arrow"
                        trend-value="4%"
                        trend-type="up"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Inquiries"
                        :value="props.dashboardData.inquiries_count"
                        icon="iconoir:mail"
                        trend-value="2%"
                        trend-type="up"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Collections"
                        :value="props.dashboardData.collections_count"
                        icon="heroicons-outline:collection"
                        trend-value="5%"
                        trend-type="up"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Bookings"
                        :value="props.dashboardData.bookings_count"
                        icon="iconoir:book"
                        trend-value="0%"
                        trend-type="neutral"
                    />
                </div>
            </div>
            <div class="relative">
                <MonthlyInquiriesChart :data="dummyInquiries" />
            </div>
        </div>
    </AppLayout>
</template>
