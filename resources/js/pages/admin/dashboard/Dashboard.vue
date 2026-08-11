<script setup lang="ts">
import DateRangeCalendar from '@/components/DateRangeCalendar.vue';
import RevenueChart from '@/components/RevenueChart.vue';
import DataCard from '@/components/statistic/DataCard.vue';
import TopPackagesChart from '@/components/TopPackagesChart.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { DateRange } from 'radix-vue';
import { ref } from 'vue';

const now = today(getLocalTimeZone())

const range = ref<DateRange>({
    start: new CalendarDate(now.year, now.month, 1),
    end: new CalendarDate(now.year, now.month, now.calendar.getDaysInMonth(now)),
})

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
];


const revenueData = [
    {
        date: '2026-01-01',
        revenue: 12000,
    },
    {
        date: '2026-01-02',
        revenue: 9000,
    },
    {
        date: '2026-04-02',
        revenue: 6000,
    },
    {
        date: '2027-12-10',
        revenue: 134000,
    },
];

const topPackagesData = [
    {
        "package": "Japan Cherry Blossom",
        "bookings": 152
    },
    {
        "package": "Korea Winter Tour",
        "bookings": 138
    },
    {
        "package": "Dubai Adventure",
        "bookings": 104
    },
    {
        "package": "Singapore Getaway",
        "bookings": 92
    },
    {
        "package": "Bali Escape",
        "bookings": 74
    }
];

</script>

<template>

    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 relative">
            <div class="grid auto-rows-min gap-4 md:grid-cols-4 lg:grid-cols-3">
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-orange)]" icon="lucide:inbox" title="Pending Inbox"
                        :value="0" />
                </div>
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-orange)]" icon="lucide:clock" title="Pending Bookings"
                        :value="0" />
                </div>
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-green)]" icon="lucide:check-line" title="Confirmed Bookings"
                        :value="0" />
                </div>
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-deepOrange)]" icon="lucide:clipboard-list" title="Quotes"
                        :value="0" />
                </div>
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-deepOrange)]" icon="lucide:plane-takeoff"
                        title="Upcoming Departures" :value="0" />
                </div>
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-green)]" icon="lucide:book-marked" title="Bookings"
                        :value="0" />
                </div>
                <div class="relative">
                    <DataCard icon-color="text-[var(--color-green)]" icon="lucide:calendar-check-2"
                        title="Completed Bookings" :value="0" />
                </div>
            </div>
            <div class="relative flex flex-col gap-4">
                <div class="self-end w-2/6">
                    <DateRangeCalendar v-model="range" placeholder="Choose Date"
                        class="text-foreground border-2 border-border " />
                </div>
                <div class="grid auto-rows-min gap-4 md:grid-cols-4 w-full">
                    <div class="relative">
                        <DataCard icon-color="text-foreground" icon="lucide:user-round" title="Clients" :value="0"
                            :with-button="false" />
                    </div>
                    <div class="relative">
                        <DataCard icon-color="text-[var(--color-green)]" icon="lucide:book-marked" title="Bookings"
                            :value="0" :with-button="false" />
                    </div>
                    <div class="relative">
                        <DataCard icon-color="text-white" background="bg-red-600" foreground="text-white"
                            icon="lucide:banknote-arrow-up" title="Revenue" :value="0" :with-button="false" />
                    </div>
                    <div class="relative">
                        <DataCard icon-color="text-[var(--color-deepOrange)]" icon="lucide:chart-line"
                            title="Average Booking Revenue" :value="0" :with-button="false" />
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="flex flex-col border-2 border-border p-4 rounded-md">
                        <h4 class="font-bold text-foreground uppercase">Revenue</h4>
                        <RevenueChart :data="revenueData" />
                    </div>
                    <div class="flex flex-col border-2 border-border p-4 rounded-md">
                        <h4 class="font-bold text-foreground uppercase">Top Packages</h4>
                        <TopPackagesChart :data="topPackagesData" />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
