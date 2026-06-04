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

interface TrendData {
    count: number;
    trend_value: number;
    trend_type: 'up' | 'down' | 'neutral';
}

interface Props {
    dashboardData: {
        packages: TrendData;
        destinations: TrendData;
        inquiries: TrendData;
        collections: TrendData;
        bookings: TrendData;
        monthly_inquiries: ChartDataPoint[];
    }
}

const props = withDefaults(defineProps<Props>(), {
    dashboardData: () => ({
        packages: { count: 0, trend_value: 0, trend_type: 'neutral' },
        destinations: { count: 0, trend_value: 0, trend_type: 'neutral' },
        inquiries: { count: 0, trend_value: 0, trend_type: 'neutral' },
        collections: { count: 0, trend_value: 0, trend_type: 'neutral' },
        bookings: { count: 0, trend_value: 0, trend_type: 'neutral' },
        monthly_inquiries: () => []
    })
});

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
            <div class="grid auto-rows-min gap-4 md:grid-cols-5">
                <div class="relative">
                    <SummaryCard
                        title="Packages"
                        :value="props.dashboardData.packages.count"
                        icon="iconoir:package"
                        :trend-value="`${props.dashboardData.packages.trend_value}%`"
                        :trend-type="props.dashboardData.packages.trend_type"
                        :delay="0.05"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Destinations"
                        :value="props.dashboardData.destinations.count"
                        icon="iconoir:maps-arrow"
                        :trend-value="`${props.dashboardData.destinations.trend_value}%`"
                        :trend-type="props.dashboardData.destinations.trend_type"
                        :delay="0.1"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Inquiries"
                        :value="props.dashboardData.inquiries.count"
                        icon="iconoir:mail"
                        :trend-value="`${props.dashboardData.inquiries.trend_value}%`"
                        :trend-type="props.dashboardData.inquiries.trend_type"
                        :delay="0.15"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Collections"
                        :value="props.dashboardData.collections.count"
                        icon="heroicons-outline:collection"
                        :trend-value="`${props.dashboardData.collections.trend_value}%`"
                        :trend-type="props.dashboardData.collections.trend_type"
                        :delay="0.2"
                    />
                </div>
                <div class="relative">
                    <SummaryCard 
                        title="Bookings"
                        :value="props.dashboardData.bookings.count"
                        icon="iconoir:book"
                        :trend-value="`${props.dashboardData.bookings.trend_value}%`"
                        :trend-type="props.dashboardData.bookings.trend_type"
                        :delay="0.25"
                    />
                </div>
            </div>
            <div class="relative">
                <MonthlyInquiriesChart :data="props.dashboardData.monthly_inquiries" />
            </div>
        </div>
    </AppLayout>
</template>
