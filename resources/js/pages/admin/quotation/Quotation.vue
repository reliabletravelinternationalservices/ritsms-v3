<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue';
import DropdownMenu, { SelectOption } from '@/components/DropdownMenu.vue';
import SearchInput from '@/components/SearchInput.vue';
// import QuotationTable from '@/components/table/quotation/QuotationTable.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const selectedStatus = ref('all');

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotations',
        href: route('admin.quotations'),
    }
];

const options: SelectOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Sent', value: 'sent' },
    { label: 'Viewed', value: 'viewed' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Expired', value: 'expired' },
    { label: 'Cancelled', value: 'cancelled' },
]







</script>



<template>

    <Head title="Quotations" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-4">
            <div class="relative grid grid-cols-2 gap-2 w-full items-center p-4">
                <div class="col-span-1 flex h-full rounded-xl text-foreground w-full gap-2">
                    <SearchInput placeholder="Search code..." class="w-full" />
                    <DropdownMenu v-model="selectedStatus" :options="options" placeholder="Status" class="w-1/3" />
                </div>
                <div class="col-span-1 flex justify-end items-center">
                    <ButtonIcon icon="lucide:plus" label="Create Quote"
                        class="text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/80" />
                </div>
            </div>

            <div>
                <!-- <QuotationTable /> -->
            </div>
        </div>
    </AppLayout>

</template>