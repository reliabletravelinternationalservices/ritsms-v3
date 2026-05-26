<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import { type Destination } from '@/types/destination';
import { truncateText } from '@/lib/utils';

interface Props {
    destination: Destination;
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Destinations',
        href: route('admin.destinations'),
    },
    {
        title: truncateText(props.destination.title, 20),
        href: route('admin.destinations.details', { id: props.destination.id }),
    },
];
</script>

<template>
    <Head title="Destination Details" />

    <AppLayout :breadcrumbs="breadcrumbs">
        this is details
    </AppLayout>
</template>
