<script setup lang="ts">
import MaintenanceOverlay from '@/components/MaintenanceOverlay.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Client Management',
        href: route('admin.users.clients'),
    },
];
</script>

<template>

    <Head title="Client Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative">
            <MaintenanceOverlay
                title="Client Management section is under development"
                description="This section is currently being developed and is not yet available for use. Please check back later for updates."
                mode="maintenance"
                estimatedTime="N/A"
            />
        </div>
    </AppLayout>
</template>