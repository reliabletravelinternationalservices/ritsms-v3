<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Inquiry } from '@/types/inquiry';
import MaintenanceOverlay from '@/components/MaintenanceOverlay.vue';

interface Props {
    inquiries: Inquiry[];
}

defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Booking Management',
        href: route('admin.bookings'),
    },
];
</script>

<template>
    <Head title="Booking Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative">
            <MaintenanceOverlay
                title="Booking Management section is under update"
                description="We are currently working on Booking Management section. We are making improvements and making the platform more reliable to become centralize booking for the agency."
                mode="features"
                estimatedTime="N/A"
            />
        </div>
    </AppLayout>
</template>