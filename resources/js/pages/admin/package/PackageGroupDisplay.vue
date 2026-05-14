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
        title: 'Package Groups',
        href: route('admin.packages.groups'),
    },
];

</script>

<template>
    <Head title="Package Groups" />

    <AppLayout :breadcrumbs="breadcrumbs">
        this is package group page
    </AppLayout>
</template>
