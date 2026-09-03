<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import SearchInput from '@/components/SearchInput.vue';
import DataCardWithIcon from '@/components/statistic/DataCardWithIcon.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import {  ref } from 'vue';
import TourTable from '@/components/table/tour/TourTable.vue';
import {  TourWithRelationshipTables } from '@/types/tour';

interface Props{
    stats: {
        totalTour: number,
        totalPublishedTour: number,
    },
    tours: TourWithRelationshipTables[]
}
const props = defineProps<Props>();


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
    },
];



const category = ref<string>('all');

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
]

const state = ref<string>('all');
const stateOptions: SelectOption[] = [
    {
        label: 'All State',
        value: 'all',
    },
    {
        label: 'Draft',
        value: 'draft',
    },
    {
        label: 'Published',
        value: 'published',
    },
    {
        label: 'Archived',
        value: 'archived',
    },
]

const visibility = ref<string>('all');
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
    }
]

const destination = ref<string>('all');
const destinationOptions: SelectOption[] = [
    {
        label: 'All Destinations',
        value: 'all',
    },
    {
        label: 'Philippines',
        value: 'philippines',
    },
    {
        label: 'China',
        value: 'china',
    },
    {
        label: 'Japan',
        value: 'japan',
    }
]



const createTour = () => router.visit(route('admin.tours.create'));


</script>


<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Tour Management" />
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-4  lg:grid-cols-5 gap-2 w-full items-center p-4">
                <DataCardWithIcon icon-background="bg-[var(--color-deepYellow)]" icon-color="text-white"
                    icon="lucide:map-pinned" title="Tours" :value="stats.totalTour" :with-button="false" />

                <DataCardWithIcon icon-background="bg-[var(--color-green)]" icon-color="text-white"
                    icon="lucide:globe-check" title="Active Tours" :value="stats.totalPublishedTour" :with-button="false" />
            </div>
            <div>
                <div class="flex flex-col gap-4">
                    <!-- FILTER -->
                    <div class="grid grid-cols-4 gap-2 w-full items-center p-4">
                        <div class="col-span-3 grid grid-cols-6 h-full rounded-xl text-foreground w-full gap-2">
                            <SearchInput placeholder="Search name or code..."
                                class="w-full border border-muted-foreground col-span-2" />
                            <SelectMenu v-model="category" :options="categoryOptions" placeholder="Category"
                                class="w-full border border-muted-foreground" />
                            <SelectMenu v-model="state" :options="stateOptions" placeholder="State"
                                class="w-full border border-muted-foreground" />
                            <SelectMenu v-model="visibility" :options="visibilityOptions" placeholder="Visibility"
                                class="w-full border border-muted-foreground" />
                            <SelectMenu v-model="destination" :options="destinationOptions"
                                placeholder="Select Destinations" class="w-full border border-muted-foreground" />

                        </div>
                        <div class="flex justify-end items-center">
                            <ButtonIcon @click="createTour" icon="lucide:plus" label="Create Tour"
                                class="text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/80" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TourTable class="w-full" :tours="props.tours" />
            </div>
        </div>
    </AppLayout>
</template>