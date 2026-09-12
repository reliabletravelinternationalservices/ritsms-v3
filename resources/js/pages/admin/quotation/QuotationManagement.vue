<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import QuotationTable from '@/components/table/quotation/QuotationTable.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Quote } from '@/types/quote';
import { Head, router } from '@inertiajs/vue3';
import { reactive, ref } from 'vue';
import PaginationButton from '@/components/table/pagination/Pagination.vue';


interface Props {
    quotations: Pagination<Quote>;
    filters: {
        search?: string,
    }
}


const props = defineProps<Props>();

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



const filters = reactive({
    page: props.quotations.current_page.toString() || '1',
    per_page: props.quotations.per_page.toString() || '10',

    // type: props.filters.type ??  'all',
    // status: props.filters.status ??  'all',
    // source: props.filters.source ??  'all',
    search: props.filters.search ??  '',
});




const loadTours = (page = 1) => {
    const params: Record<string, string | number> = {}

    if (page !== 1) {
        params.page = page
    }
    if (Number(filters.per_page) !== 10) {
        params.per_page = filters.per_page
    }

    // if (filters.type !== 'all') {
    //     params.type = filters.type
    // }

    // if (filters.status !== 'all') {
    //     params.status = filters.status
    // }

    // if (filters.source !== 'all') {
    //     params.source = filters.source
    // }


    if (filters.search.trim() !== '') {
        params.search = filters.search.trim()
    }

    router.get(route('admin.quotations'), params, {
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



function createQuotation () { router.visit(route('admin.quotations.create')) }



</script>



<template>

    <Head title="Quotations" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-4">
            <div class="relative grid grid-cols-2 gap-2 w-full items-center p-4">
                <div class="col-span-1 flex h-full rounded-xl text-foreground w-full gap-2">
                    <SearchInput placeholder="Search code..." class="w-full" />
                    <SelectMenu v-model="selectedStatus" :options="options" placeholder="Status" class="w-1/3" />
                </div>
                <div class="col-span-1 flex justify-end items-center">
                    <ButtonIcon @click="createQuotation"  icon="lucide:plus" label="Create Quote"
                        class="text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/80" />
                </div>
            </div>

            <div class="flex flex-col gap-4 p-4">
                <QuotationTable :quotes="quotations.data" />
                <PaginationButton :pagination="props.quotations" :per-page="filters.per_page" @page-change="handlePageChange"
                    @update:per-page="handlePerPageChange" />
            </div>
        </div>
    </AppLayout>

</template>