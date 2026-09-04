```vue
<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import SearchInput from '@/components/SearchInput.vue';
import DataCardWithIcon from '@/components/statistic/DataCardWithIcon.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { computed, reactive } from 'vue';
import TourTable from '@/components/table/tour/TourTable.vue';
import { TourWithRelationshipTables } from '@/types/tour';
import { useReferenceDataStore } from '@/stores/referenceData';
import PaginationButton from '@/components/table/pagination/pagination.vue';
import { Pagination } from '@/types/pagination';

interface Props {
    stats: {
        totalTour: number,
        totalPublishedTour: number,
    },
    tours: Pagination<TourWithRelationshipTables>,
    countries: {
        id: number,
        name: string,
    }[]
}

const props = defineProps<Props>();


const useReference = useReferenceDataStore();

useReference.setCountries(props.countries);


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
    },
];


const filters = reactive({
    page: props.tours.current_page.toString() ?? '1',
    per_page: props.tours.per_page.toString() ?? '10',
    state: 'all',
    category: 'all',
    visibility: 'all',
    destination: '0',
    search: '',
});


const categoryOptions: SelectOption[] = [
    {
        label: 'All Category',
        value: 'all',
    },
    {
        label: 'Inbound',
        value: 'inbound',
    },
    {
        label: 'Outbound',
        value: 'outbound',
    },
    {
        label: 'Domestic',
        value: 'domestic',
    },
];


const stateOptions: SelectOption[] = [
    {
        label: 'Published & Draft',
        value: 'all',
    },
    {
        label: 'Draft Only',
        value: 'draft',
    },
    {
        label: 'Published Only',
        value: 'published',
    },
    {
        label: 'Archived',
        value: 'archived',
    },
];


const visibilityOptions: SelectOption[] = [
    {
        label: 'Public & Private',
        value: 'all',
    },
    {
        label: 'Public Only',
        value: 'public',
    },
    {
        label: 'Private Only',
        value: 'private',
    },
];


const destinationOptions = computed<SelectOption[]>(() => [
    {
        label: 'All Destinations',
        value: '0',
    },
    ...useReference.countryOptions,
]);


const loadTours = (page = 1) => {
    const params: Record<string, string | number> = {}

    if (page !== 1) {
        params.page = page
    }
    if (Number(filters.per_page) !== 10) {
        params.per_page = filters.per_page
    }

    if (filters.state !== 'all') {
        params.state = filters.state
    }

    if (filters.category !== 'all') {
        params.category = filters.category
    }

    if (filters.visibility !== 'all') {
        params.visibility = filters.visibility
    }

    if (filters.destination !== '0') {
        params.destination = filters.destination
    }

    if (filters.search.trim() !== '') {
        params.search = filters.search.trim()
    }

    router.get(route('admin.tours'), params, {
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


const createTour = () => router.visit(route('admin.tours.create'));
</script>


<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Tour Management" />

        <div class="flex flex-col gap-4">

            <!-- STATISTICS -->
            <div class="grid grid-cols-4 lg:grid-cols-5 gap-2 w-full items-center p-4">

                <DataCardWithIcon
                    icon-background="bg-[var(--color-deepYellow)]"
                    icon-color="text-white"
                    icon="lucide:map-pinned"
                    title="Tours"
                    :value="stats.totalTour"
                    :with-button="false"
                />

                <DataCardWithIcon
                    icon-background="bg-[var(--color-green)]"
                    icon-color="text-white"
                    icon="lucide:globe-check"
                    title="Active Tours"
                    :value="stats.totalPublishedTour"
                    :with-button="false"
                />

            </div>


            <!-- FILTERS -->
            <div class="flex flex-col gap-4">

                <div class="grid grid-cols-4 gap-2 w-full items-center p-4">

                    <div
                        class="col-span-3 grid grid-cols-6 h-full rounded-xl text-foreground w-full gap-2"
                    >

                        <SearchInput
                            v-model="filters.search"
                            placeholder="Search name or code..."
                            class="w-full border border-muted-foreground col-span-2"
                            @keyup.enter="applyFilters"
                        />

                        <SelectMenu
                            v-model="filters.category"
                            :options="categoryOptions"
                            placeholder="Category"
                            class="w-full border border-muted-foreground"
                            @update:model-value="applyFilters"
                        />

                        <SelectMenu
                            v-model="filters.state"
                            :options="stateOptions"
                            placeholder="State"
                            class="w-full border border-muted-foreground"
                            @update:model-value="applyFilters"
                        />

                        <SelectMenu
                            v-model="filters.visibility"
                            :options="visibilityOptions"
                            placeholder="Visibility"
                            class="w-full border border-muted-foreground"
                            @update:model-value="applyFilters"
                        />

                        <SelectMenu
                            v-model="filters.destination"
                            :options="destinationOptions"
                            placeholder="Select Destinations"
                            class="w-full border border-muted-foreground"
                            @update:model-value="applyFilters"
                        />

                    </div>


                    <!-- CREATE TOUR -->
                    <div class="flex justify-end items-center">

                        <ButtonIcon
                            @click="createTour"
                            icon="lucide:plus"
                            label="Create Tour"
                            class="text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/80"
                        />

                    </div>

                </div>

            </div>


            <!-- TABLE + PAGINATION -->
            <div class="flex flex-col gap-4 p-4">

                <TourTable
                    class="w-full"
                    :tours="props.tours"
                />

                <PaginationButton
                    :pagination="props.tours"
                    :per-page="filters.per_page"
                    @page-change="handlePageChange"
                    @update:per-page="handlePerPageChange"
                />

            </div>

        </div>

    </AppLayout>
</template>
```
