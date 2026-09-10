<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import SearchInput from '@/components/SearchInput.vue';
import DataCardWithIcon from '@/components/statistic/DataCardWithIcon.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { reactive } from 'vue';
import PaginationButton from '@/components/table/pagination/Pagination.vue';
import { Pagination } from '@/types/pagination';
import ClientTable from '@/components/table/client/ClientTable.vue';
import { Client } from '@/types/client';

interface Props {
    stats: {
        totalClient: number,
    },
    clients: Pagination<Client>
    filters: {
        type?: string,
        status?: string,
        source?: string,
        search?: string,
    }
}
const props = defineProps<Props>()

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
    },
];


const filters = reactive({
    page: props.clients.current_page.toString() || '1',
    per_page: props.clients.per_page.toString() || '10',

    type: props.filters.type ??  'all',
    status: props.filters.status ??  'all',
    source: props.filters.source ??  'all',
    search: props.filters.search ??  '',
});


const typeOptions: SelectOption[] = [
    {
        label: 'All Types',
        value: 'all',
    },
    {
        label: 'Personal',
        value: 'personal',
    },
    {
        label: 'Business',
        value: 'business',
    },
    {
        label: 'Partner',
        value: 'partner',
    },
    {
        label: 'Other',
        value: 'other',
    },
]

const statusOptions: SelectOption[] = [
    {
        label: 'All Statuses',
        value: 'all',
    },
    {
        label: 'New',
        value: 'new',
    },
    {
        label: 'Contacted',
        value: 'contacted',
    },
    {
        label: 'Qualified',
        value: 'qualified',
    },
    {
        label: 'Quotation Sent',
        value: 'quotation_sent',
    },
    {
        label: 'Booked',
        value: 'booked',
    },
    {
        label: 'Completed',
        value: 'completed',
    },
    {
        label: 'Unresponsive',
        value: 'unresponsive',
    },
    {
        label: 'Cancelled',
        value: 'cancelled',
    },
    {
        label: 'Disqualified',
        value: 'disqualified',
    },
    {
        label: 'Deleted',
        value: 'deleted',
    },
]

const sourceOptions: SelectOption[] = [
    {
        label: 'All Sources',
        value: 'all',
    },
    {
        label: 'Website',
        value: 'website',
    },
    {
        label: 'Manual',
        value: 'manual',
    },
    {
        label: 'Gmail',
        value: 'gmail',
    },
    {
        label: 'Walk In',
        value: 'walk_in',
    },
    {
        label: 'Google Ads',
        value: 'google_ads',
    },
    {
        label: 'Facebook',
        value: 'facebook',
    },
    {
        label: 'Instagram',
        value: 'instagram',
    },
    {
        label: 'TikTok',
        value: 'tiktok',
    },
    {
        label: 'YouTube',
        value: 'youtube',
    },
    {
        label: 'Other',
        value: 'other',
    },
]

const loadTours = (page = 1) => {
    const params: Record<string, string | number> = {}

    if (page !== 1) {
        params.page = page
    }
    if (Number(filters.per_page) !== 10) {
        params.per_page = filters.per_page
    }

    if (filters.type !== 'all') {
        params.type = filters.type
    }

    if (filters.status !== 'all') {
        params.status = filters.status
    }

    if (filters.source !== 'all') {
        params.source = filters.source
    }


    if (filters.search.trim() !== '') {
        params.search = filters.search.trim()
    }

    router.get(route('admin.clients'), params, {
        preserveState: true,
        preserveScroll: true,
    })
}


const applyFilters = () => {
    filters.page = '1';

    loadTours();
};


const handlePageChange = (page: string) => {
    filters.page = page;

    loadTours();
};


const handlePerPageChange = (value: string) => {
    filters.per_page = value;
    filters.page = '1';

    loadTours();
};


const createClient = () => router.visit(route('admin.clients.create'));


</script>


<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Client Management" />

        <div class="flex flex-col gap-4">

            <!-- STATISTICS -->
            <div class="grid grid-cols-4 lg:grid-cols-5 gap-2 w-full items-center p-4">

                <DataCardWithIcon icon-background="bg-[var(--color-deepYellow)]" icon-color="text-white"
                    icon="lucide:square-user-round" title="Clients" :value="props.stats.totalClient" :with-button="false" />

            </div>


            <!-- FILTERS -->
            <div class="flex flex-col gap-4">

                <div class="grid grid-cols-4 gap-2 w-full items-center p-4">

                    <div class="col-span-3 grid grid-cols-6 h-full rounded-xl text-foreground w-full gap-2">

                        <SearchInput v-model="filters.search" placeholder="Search name | email | code..."
                            class="w-full border border-muted-foreground col-span-2" @keyup.enter="applyFilters" />

                        <SelectMenu v-model="filters.type" :options="typeOptions" placeholder="Type"
                            class="w-full border border-muted-foreground" @update:model-value="applyFilters" />

                        <SelectMenu v-model="filters.status" :options="statusOptions" placeholder="Status"
                            class="w-full border border-muted-foreground" @update:model-value="applyFilters" />

                        <SelectMenu v-model="filters.source" :options="sourceOptions" placeholder="Source"
                            class="w-full border border-muted-foreground" @update:model-value="applyFilters" />

                    </div>


                    <!-- CREATE TOUR -->
                    <div class="flex justify-end items-center">

                        <ButtonIcon @click="createClient" icon="lucide:plus" label="Create Client"
                            class="text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/80" />

                    </div>

                </div>

            </div>


            <!-- TABLE + PAGINATION -->
            <div class="flex flex-col gap-4 p-4">

                <ClientTable class="w-full" :clients="props.clients" />

                <PaginationButton :pagination="props.clients" :per-page="filters.per_page" @page-change="handlePageChange"
                    @update:per-page="handlePerPageChange" />

            </div>

        </div>

    </AppLayout>
</template>