<script setup lang="ts">
import { computed } from 'vue';

interface TopPackage {
    package: string;
    bookings: number;
}

const props = defineProps<{
    data: TopPackage[];
}>();

const series = computed(() => [
    {
        name: 'Bookings',
        data: props.data.map(item => item.bookings),
    },
]);

const chartOptions = computed(() => ({
    chart: {
        type: 'bar',
        toolbar: {
            show: false,
        },
    },
    colors: ['#DD991D'],
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 2,
            distributed: false,
        },
    },

    dataLabels: {
        enabled: true,
    },

    xaxis: {
        categories: props.data.map(item => item.package),
        labels: {
            formatter: (value: number) =>
                new Intl.NumberFormat().format(value),
        },
    },

    grid: {
        borderColor: '#ececec',
    },

    tooltip: {
        y: {
            formatter: (value: number) => `${value} bookings`,
        },
    },
}));
</script>

<template>
    <ApexCharts type="bar" height="350" :options="chartOptions" :series="series" />
</template>