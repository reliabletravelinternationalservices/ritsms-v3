<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import InquiryTable from '@/components/table/inquiry/InquiryTable.vue';
import { Inquiry } from '@/types/inquiry';
import SummaryCard from '@/components/statistic/SummaryCard.vue';
import { ref, computed } from 'vue';


interface Props {
    inquiries: Inquiry[];
}

const props = defineProps<Props>();

const filteredInquiries = ref(props.inquiries);

const totalInquiries = computed(() => filteredInquiries.value.length);

const pendingCount = computed(() =>
    filteredInquiries.value.filter(i => i.status === 'pending').length
);

const resolvedCount = computed(() =>
    filteredInquiries.value.filter(i => i.status === 'resolved').length
);

const dismissedCount = computed(() =>
    filteredInquiries.value.filter(i => i.status === 'dismissed').length
);


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
            <div class="grid auto-rows-min gap-4 md:grid-cols-4">
                <div class="relative">
                    <SummaryCard
                        title="Total Inquiries"
                        :value="totalInquiries"
                        icon="iconoir:mail"
                        trend-value="12%"
                        trend-type="up"
                    />
                </div>
                <div class="relative">
                    <SummaryCard
                        title="Pending"
                        :value="pendingCount"
                        icon="mdi:email-sent-outline"
                    />
                </div>

                <div class="relative">
                    <SummaryCard
                        title="Resolved"
                        :value="resolvedCount"
                        icon="mynaui:check"
                    />
                </div>

                <div class="relative">
                    <SummaryCard
                        title="Dismissed"
                        :value="dismissedCount"
                        icon="line-md:remove"
                    />
                </div>
            </div>
            
            <!-- MAIN DATATABLE CONTAINER -->
            <div class="relative min-h-[400vh] flex-1 md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card shadow-sm">
                <InquiryTable :inquiries="inquiries"/>
            </div>

        </div>
    </AppLayout>
</template>