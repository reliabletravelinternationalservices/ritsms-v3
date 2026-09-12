<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import MaintenanceOverlay from '@/components/MaintenanceOverlay.vue';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Logs',
        href: route('admin.logs'),
    }
];

</script>

<template>
    <Head title="Activity Logs" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative">
            <MaintenanceOverlay
                title="Log section is under update"
                description="We are modifying telemetry storage variables to process database rows faster. Reading logs is temporarily frozen."
                mode="update"
                estimatedTime="N/A"
            />
        </div>
    </AppLayout>
</template>