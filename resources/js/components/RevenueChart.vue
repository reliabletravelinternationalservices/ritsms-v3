<script setup lang="ts">
import { computed } from 'vue';

interface RevenuePoint {
    date: string;
    revenue: number;
}

const props = defineProps<{
    data: RevenuePoint[];
}>();

const series = computed(() => [
    {
        name: 'Revenue',
        data: props.data.map(item => ({
            x: item.date,
            y: item.revenue,
        })),
    },
]);

const chartOptions = {
    chart: {
        type: 'area',
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },

    stroke: {
        curve: 'smooth',
        width: 2,
    },

    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.35,
            opacityTo: 0.05,
        },
    },

    xaxis: {
        type: 'datetime',
    },

    yaxis: {
        labels: {
            formatter: (value: number) =>
                new Intl.NumberFormat('en', {
                    notation: 'compact',
                }).format(value),
        },
    },

    tooltip: {
        x: {
            format: 'dd MMM yyyy',
        },
        y: {
            formatter: (value: number) =>
                new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                }).format(value),
        },
    },

    dataLabels: {
        enabled: false,
    },

    grid: {
        borderColor: '#ececec',
    },
};
</script>

<template>
    <ApexCharts height="320" type="area" :options="chartOptions" :series="series" />
</template>