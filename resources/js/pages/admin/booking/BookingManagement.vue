<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head, router } from '@inertiajs/vue3';
import { reactive } from 'vue';
import PaginationButton from '@/components/table/pagination/Pagination.vue';
import { Booking } from '@/types/booking';
import BookingTable from '@/components/table/booking/BookingTable.vue';


interface Props {
    bookings: Pagination<Booking>;
    filters: {
        search?: string,
        status?: string,
    }
}


const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bookings',
        href: route('admin.bookings'),
    }
];

const options: SelectOption[] = [
    { label: 'All Status', value: 'all' },
]



const filters = reactive({
    page: props.bookings.current_page.toString() || '1',
    per_page: props.bookings.per_page.toString() || '10',
    status: props.filters.status ??  'all',
    search: props.filters.search ??  '',
});




const loadBookings = (page = 1) => {
    const params: Record<string, string | number> = {}

    if (page !== 1) {
        params.page = page
    }
    if (Number(filters.per_page) !== 10) {
        params.per_page = filters.per_page
    }

    if (filters.status !== 'all') {
        params.status = filters.status
    }


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

    loadBookings();
};


const handlePageChange = (page: string) => {
    filters.page = page;

    loadBookings();
};


const handlePerPageChange = (value: string) => {
    filters.per_page = value;
    filters.page = '1';

    loadBookings();
};



function createBooking () { router.visit(route('admin.bookings.create')) }




</script>



<template>

    <Head title="Bookings" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-4">
            <div class="relative grid grid-cols-2 gap-2 w-full items-center p-4">
                <div class="col-span-1 flex h-full rounded-xl text-foreground w-full gap-2">
                    <SearchInput v-model="filters.search" placeholder="Search code..." class="w-full" @keyup.enter="applyFilters" />
                    <SelectMenu v-model="filters.status" :options="options" placeholder="Status" class="w-1/3" :enable-clear="false" @update:model-value="applyFilters"/>
                </div>
                <div class="col-span-1 flex justify-end items-center">
                    <ButtonIcon @click="createBooking"  icon="lucide:plus" label="Create Booking"
                        class="text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/80" />
                </div>
            </div>

            <div class="flex flex-col gap-4 p-4">
                <BookingTable :bookings="bookings" />
                <PaginationButton :pagination="props.bookings" :per-page="filters.per_page" @page-change="handlePageChange"
                    @update:per-page="handlePerPageChange" />
            </div>
        </div>
    </AppLayout>

</template>