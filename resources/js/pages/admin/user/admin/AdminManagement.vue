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
        title: 'Admin Management',
        href: route('admin.users.admins'),
    },
];
</script>

<template>

    <Head title="Admin Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        this is admin management
    </AppLayout>
</template>