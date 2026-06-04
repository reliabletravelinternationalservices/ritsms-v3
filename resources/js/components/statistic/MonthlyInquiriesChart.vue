<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ChartDataPoint } from '@/types/statistics';
import apexchart from 'vue3-apexcharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import type { ApexOptions } from 'apexcharts';

const props = withDefaults(defineProps<ComponentProps>(), {
    title: 'Monthly inquiries',
    description: 'Track inquiry volume over time.',
    data: () => [
        { month: 'Jan', count: 80, dateKey: '2026' },
        { month: 'Feb', count: 95, dateKey: '2026' },
        { month: 'Mar', count: 120, dateKey: '2026' },
        { month: 'Apr', count: 110, dateKey: '2026' },
        { month: 'May', count: 155, dateKey: '2026' },
        { month: 'Jun', count: 178, dateKey: '2026' },
        { month: 'Jan', count: 45, dateKey: '2025' },
        { month: 'Feb', count: 60, dateKey: '2025' },
    ]
});

interface ComponentProps {
    title?: string;
    description?: string;
    data: ChartDataPoint[];
}

interface FilterPayload {
    year: string;
}

const emit = defineEmits<{
    (e: 'filterChange', payload: FilterPayload): void;
}>();



const computedAvailableYears = computed<string[]>(() => {
    // gather unique year keys from provided data
    const years = Array.from(new Set(props.data.map((d: ChartDataPoint) => d.dateKey).filter(Boolean))) as string[];
    if (years.length) {
        // sort newest -> oldest
        return years.sort((a, b) => Number(b) - Number(a));
    }

    // fallback: current year and previous 3 years
    const current = new Date().getFullYear();
    return Array.from({ length: 4 }, (_, i) => String(current - i));
});

const currentYear = ref<string>(computedAvailableYears.value[0] ?? new Date().getFullYear().toString());
const availableYears = computedAvailableYears;

// keep currentYear in sync if available years change (e.g., new data arrives)
watch(computedAvailableYears, (val) => {
    if (!val.includes(currentYear.value)) {
        currentYear.value = val[0];
    }
}, { immediate: true });

// emit filter change whenever year selection updates
watch(currentYear, () => {
    handleFiltersUpdated();
});

const filteredData = computed<ChartDataPoint[]>(() => {
    return props.data.filter((d: ChartDataPoint) => d.dateKey === currentYear.value);
});

const hasData = computed<boolean>(() => filteredData.value.length > 0);

const handleFiltersUpdated = (): void => {
    emit('filterChange', { year: currentYear.value });
};

interface ApexChartSeriesItem {
    name: string;
    data: number[];
}

const chartSeries = computed<ApexChartSeriesItem[]>((): ApexChartSeriesItem[] => [
    {
        name: 'Inquiries',
        data: hasData.value ? filteredData.value.map((d: ChartDataPoint): number => d.count) : []
    }
]);

interface ApexCustomTooltipParams {
    series: number[][];
    seriesIndex: number;
    dataPointIndex: number;
    w: {
        globals: {
            categoryLabels: string[];
        };
    };
}

const chartOptions = computed<ApexOptions>((): ApexOptions => ({
    chart: {
        type: 'area',
        height: '100%',
        width: '100%', // 1. Tells Apex to target parent dimensions directly
        redrawOnParentResize: true, // 2. Forces recalculation when parent layout layout resolves
        redrawOnWindowResize: true,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent',
        foreColor: '#52525b',
    },
    colors: ['#0284c7'],
    stroke: {
        curve: 'smooth',
        width: 3,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.25,
            opacityTo: 0.0,
            stops: [0, 90, 100]
        }
    },
    markers: {
        size: 0,
        hover: { size: 5, sizeOffset: 3 }
    },
    noData: {
        text: `No inquiries recorded for ${currentYear.value}`,
        align: 'center',
        verticalAlign: 'middle',
        style: {
            color: '#a1a1aa',
            fontSize: '14px',
            fontFamily: 'sans-serif'
        }
    },
    grid: {
        borderColor: '#18181b',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: hasData.value } },
        padding: { top: 10, right: 10, bottom: 0, left: 10 }
    },
    xaxis: {
        categories: hasData.value ? filteredData.value.map((d: ChartDataPoint): string => d.month) : [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: {
            show: hasData.value,
            style: { fontSize: '11px' }
        }
    },
    yaxis: {
        min: 0,
        max: hasData.value ? Math.max(...filteredData.value.map((d: ChartDataPoint): number => d.count), 200) + 20 : 100,
        tickAmount: 4,
        labels: {
            show: hasData.value,
            style: {
                colors: ['#52525b'],
                fontSize: '11px',
            }
        }
    },
    tooltip: {
        enabled: hasData.value,
        theme: 'dark',
        custom: function ({ series, seriesIndex, dataPointIndex, w }: ApexCustomTooltipParams): string {
            const currentMonth: string = w.globals.categoryLabels[dataPointIndex];
            const currentValue: number = series[seriesIndex][dataPointIndex];
            return `
                <div class="bg-zinc-900 border border-zinc-800 text-zinc-50 p-3 rounded-xl shadow-xl min-w-[120px] font-sans">
                    <div class="text-xs font-bold text-zinc-400 mb-1.5">${currentMonth}</div>
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block"></span>
                        <span class="text-xs text-zinc-300">Inquiries</span>
                        <span class="text-xs font-mono font-bold ml-auto">${currentValue}</span>
                    </div>
                </div>
            `;
        }
    }
}));
</script>

<template>
    <MotionWrapper :delay="0.2">
        <Card
            class="w-full bg-zinc-950 border border-zinc-900 text-zinc-50 shadow-2xl rounded-xl overflow-hidden p-4 sm:p-6">
            <CardHeader
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6 border-b border-zinc-900/50 mb-6 p-0">
                <div class="space-y-1">
                    <CardTitle class="text-xl font-bold tracking-tight text-zinc-100">
                        {{ props.title }}
                    </CardTitle>
                    <CardDescription class="text-xs text-zinc-400">
                        {{ props.description }}
                    </CardDescription>
                </div>

                <div class="w-full sm:w-auto flex items-center justify-start sm:justify-end">
                    <Select v-model="currentYear">
                        <SelectTrigger
                            class="w-full sm:w-[120px] h-9 bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-sky-600">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent class="bg-zinc-900 border-zinc-800 text-zinc-200">
                            <SelectItem v-for="year in availableYears" :key="year" :value="year">
                                {{ year }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent class="p-0 w-full">
                <div
                    class="h-[240px] sm:h-[300px] w-full block block-items relative transition-all [&>div]:!w-full [&>.apexcharts-container]:!w-full">
                    <apexchart width="100%" height="100%" :options="chartOptions" :series="chartSeries" />
                </div>
            </CardContent>
        </Card>
    </MotionWrapper>
</template>