<script setup lang="ts">
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
        this is client management
    </AppLayout>
</template>