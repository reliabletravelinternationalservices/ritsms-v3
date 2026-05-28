<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Inquiry } from '@/types/inquiry';

interface Props {
    inquiry: Inquiry;
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Inquiries',
        href: route('admin.inquiries'),
    },
    {
        title: 'Details',
        href: route('admin.inquiries', { id: props.inquiry.id }),
    }
];
</script>

<template>
    <Head title="Client Inquiries" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            inquiry deytails

        </div>
    </AppLayout>
</template>