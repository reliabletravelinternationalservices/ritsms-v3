<script setup lang="ts">
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import InquiryTable from '@/components/table/inquiry/InquiryTable.vue';
import { Inquiry } from '@/types/inquiry';

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
        title: 'Inquiries',
        href: route('admin.inquiries'),
    },
];
</script>

<template>
    <Head title="Client Inquiries" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            
            <!-- TOP STATS OVERVIEW CARDS -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 flex flex-col justify-between bg-card text-card-foreground shadow-sm">
                    <PlaceholderPattern class="absolute inset-0" />
                </div>
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 flex flex-col justify-between bg-card text-card-foreground shadow-sm">
                    <PlaceholderPattern class="absolute inset-0" />
                </div>
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 flex flex-col justify-between bg-card text-card-foreground shadow-sm">
                    <PlaceholderPattern class="absolute inset-0" />
                </div>
            </div>
            
            <!-- MAIN DATATABLE CONTAINER -->
            <div class="relative min-h-[400vh] flex-1 md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card shadow-sm">
                <InquiryTable :inquiries="inquiries"/>
            </div>

        </div>
    </AppLayout>
</template>