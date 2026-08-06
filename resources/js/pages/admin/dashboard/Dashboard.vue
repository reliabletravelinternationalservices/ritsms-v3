<script setup lang="ts">
import DataCard from '@/components/statistic/DataCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
];

</script>

<template>

    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
            <div class="grid auto-rows-min gap-4 md:grid-cols-4">
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
            <div class="relative">

            </div>
        </div>
    </AppLayout>
</template>
