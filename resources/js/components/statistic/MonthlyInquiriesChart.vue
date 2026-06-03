<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import apexchart from 'vue3-apexcharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DateRangePickerInput, { type DateRangePayload } from '@/components/DateRangePicker.vue'; // Ensure the path matches your filename
import type { ApexOptions } from 'apexcharts';

// Strict definitions for chart items data mapping
export interface ChartDataPoint {
    month: string;
    count: number;
    dateKey?: string;
}

interface ComponentProps {
    title?: string;
    description?: string;
    data: ChartDataPoint[];
}

// Explicitly typed compiler definitions configuration blocks
const props = withDefaults(defineProps<ComponentProps>(), {
    title: 'Monthly inquiries',
    description: 'Track inquiry volume over time.',
    data: () => [
        { month: 'Jan', count: 80 },
        { month: 'Feb', count: 95 },
        { month: 'Mar', count: 120 },
        { month: 'Apr', count: 110 },
        { month: 'May', count: 155 },
        { month: 'Jun', count: 178 },
    ]
});

// Explicit structure configuration emitted parameters
interface FilterPayload {
    year: string;
    startDate: string;
    endDate: string;
}

const emit = defineEmits<{
    (e: 'filterChange', payload: FilterPayload): void;
}>();

// Baseline Initialization using regular JS strings
const currentYear = ref<string>(new Date().getFullYear().toString());

// Standard Date Formats Helper Setup (YYYY-MM-DD)
const getTodayString = (): string => new Date().toISOString().split('T')[0];
const getSixMonthsAgoString = (): string => {
    const d: Date = new Date();
    d.setMonth(d.getMonth() - 6);
    return d.toISOString().split('T')[0];
};

// Range Object State matching your compound wrapper requirement
const rangeFilters = ref<DateRangePayload>({
    startDate: getSixMonthsAgoString(),
    endDate: getTodayString()
});

const availableYears: string[] = ['2024', '2025', '2026', '2027'];

// Centralized emission handler fired cleanly whenever 'Done' or 'Clear' processes execute
const handleFiltersUpdated = (): void => {
    emit('filterChange', {
        year: currentYear.value,
        startDate: rangeFilters.value.startDate,
        endDate: rangeFilters.value.endDate
    });
};

interface ApexChartSeriesItem {
    name: string;
    data: number[];
}

const chartSeries = computed<ApexChartSeriesItem[]>((): ApexChartSeriesItem[] => [
    {
        name: 'Inquiries',
        data: props.data.map((d: ChartDataPoint): number => d.count)
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
    grid: {
        borderColor: '#18181b',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { top: 10, right: 20, bottom: 0, left: 10 }
    },
    xaxis: {
        categories: props.data.map((d: ChartDataPoint): string => d.month),
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false }
    },
    yaxis: {
        min: 0,
        max: Math.max(...props.data.map((d: ChartDataPoint): number => d.count), 200) + 20,
        tickAmount: 4,
        labels: {
            style: {
                colors: ['#52525b'],
                fontSize: '12px',
            }
        }
    },
    tooltip: {
        theme: 'dark',
        custom: function({ series, seriesIndex, dataPointIndex, w }: ApexCustomTooltipParams): string {
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
    <Card class="bg-zinc-950 border border-zinc-900 text-zinc-50 shadow-2xl rounded-xl overflow-hidden p-2">
        <CardHeader class="flex flex-col xl:flex-row items-start xl:items-center justify-between space-y-4 xl:space-y-0 pb-6 border-b border-zinc-900/50 mb-4">
            <div class="space-y-1">
                <CardTitle class="text-lg font-bold tracking-tight text-zinc-100">
                    {{ props.title }}
                </CardTitle>
                <CardDescription class="text-xs text-zinc-400">
                    {{ props.description }}
                </CardDescription>
            </div>

            <div class="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                
                <Select v-model="currentYear" @update:model-value="handleFiltersUpdated">
                    <SelectTrigger class="w-[110px] h-9 bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-sky-600">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent class="bg-zinc-900 border-zinc-800 text-zinc-200">
                        <SelectItem v-for="year in availableYears" :key="year" :value="year">
                            {{ year }}
                        </SelectItem>
                    </SelectContent>
                </Select>

                <DateRangePickerInput 
                    v-model="rangeFilters" 
                    @change="handleFiltersUpdated"
                />

            </div>
        </CardHeader>
        
        <CardContent class="pb-2">
            <div class="h-[280px] w-full">
                <apexchart
                    width="100%"
                    height="100%"
                    :options="chartOptions"
                    :series="chartSeries"
                />
            </div>
        </CardContent>
    </Card>
</template>