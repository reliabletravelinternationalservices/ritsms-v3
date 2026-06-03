<script setup lang="ts">
import DestinationCell from './DestinationCell.vue';
import DurationCell from './DurationCell.vue';
import NameWithImageCell from './NameWithImageCell.vue';
import PriceCell from './PriceCell.vue';
import StatusIndicatorCell from './StatusIndicatorCell.vue';
import { Input } from '@/components/ui/input';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

import { 
    useVueTable, 
    FlexRender, 
    getCoreRowModel, 
    CellContext, 
    getPaginationRowModel,
    getFilteredRowModel  
} from '@tanstack/vue-table';

import { h, ref, computed } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { Link } from '@inertiajs/vue3';
import LinkCell from '@/components/table/package/LinkCell.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';


interface Props {
    packages: Package[];
    countries: string[];
}


const props = defineProps<Props>();

const data = ref<Package[]>(props.packages);
const destinationFilter = ref<string>('');
const search = ref<string>('');

// Custom filter function for destination
const filteredByDestination = computed(() => {
    if (!destinationFilter.value) return data.value;
    
    return data.value.filter(pkg => {
        return pkg.destination === destinationFilter.value;
    });
});

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableHiding: true,
        enableSorting: true,
        cell: () => null,
        meta: {
            hidden: true,
        },
    },
    {
        header: 'Name',
        accessorKey: 'name',
        enableSorting: true,
        minSize: 400,
        maxSize: 700,
        cell : (info: CellContext<Package, unknown>) =>
            h(NameWithImageCell, {
                name: info.row.original.name,
                image: info.row.original.primary_image
            }),
    },
    {
        header: 'Destination',
        accessorKey: 'destination',
        minSize: 200,
        maxSize: 300,
        cell : (info: CellContext<Package, unknown>) =>
            h(DestinationCell, {
                destination: info.row.original.destination,
                season: info.row.original.season
            }),
    },
    {
        header: 'Price',
        accessorKey: 'base_price',
        minSize: 200,
        maxSize: 300,
        cell: (info: CellContext<Package, unknown>) =>
            h(PriceCell, {
                price: Number(info.row.original.base_price),
                downPayment: Number(info.row.original.down_payment),
            }),
    },
    {
        header: 'Duration',
        accessorKey: 'duration',
        minSize: 100,
        maxSize: 200,
        cell : (info: CellContext<Package, unknown>) =>
            h(DurationCell, {
                duration: info.row.original.duration,
            }),
    },
    {
        header: 'Status',
        accessorKey: 'selling_end_date',
        minSize: 200,
        maxSize: 300,
        cell: (info: CellContext<Package, unknown>) =>
            h(StatusIndicatorCell, {
                endDate: info.row.original.selling_end_date
            }),
    },
    {
        header: 'Actions',
        accessorKey: 'actions',
        minSize: 100,
        maxSize: 300,
        cell: (info: CellContext<Package, unknown>) => 
            h(LinkCell, { 
                href: route('admin.packages.details', { id: info.row.original.id }),
                label: 'View Details'
            }),
    },
];


const globalFilter = ref<string>('');

const table = useVueTable({
        data: filteredByDestination,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
            columnVisibility: {
                id: false,
            },
        },
        state: {
            get globalFilter() {
                return globalFilter.value;
            },
        },

        onGlobalFilterChange: (updater) => {
            globalFilter.value =
                typeof updater === 'function'
                    ? updater(globalFilter.value)
                    : updater;
        },
});

</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div class="flex items-center gap-4">
                <Input
                    v-model="search"
                    type="text"
                    placeholder="Search by Name, Destination and Season..."
                    class="border rounded-sm px-3 py-2 w-full max-w-sm"
                    @keyup.enter="table.setGlobalFilter(search)"
                    @input="!search.trim() && table.setGlobalFilter('')"
                />

                <button
                    class="flex items-center"
                    @click="table.setGlobalFilter(search)"
                >
                    <Icon icon="iconoir:search" class="text-2xl" />
                </button>
            </div>

            <div class="flex flex-wrap items-end gap-4">
                
                <div class="flex flex-col gap-1">
                    <label class="text-xs font-semibold text-muted-foreground">
                        Destination Country
                    </label>
                    <Select v-model="destinationFilter">
                        <SelectTrigger class="w-[200px] border rounded-sm px-3 py-2 h-10">
                            <SelectValue :placeholder="destinationFilter ? destinationFilter : 'All Countries'" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">
                                All Countries
                            </SelectItem>
                            <SelectItem
                                v-for="country in countries"
                                :key="country"
                                :value="country"
                            >
                                {{ country }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex flex-col gap-1">
                    <span>
                        <Link :href="route('admin.packages.create')">
                            <Button type="button" variant="default">
                                Create
                            </Button>
                        </Link>
                    </span>
                </div>

            </div>

        </div>
        <table class="w-full table-auto">
            <thead>
                <tr v-for="columnHeaders in table.getHeaderGroups()" :key="columnHeaders.id">
                    <th class="border px-4 py-2" v-for="header in columnHeaders.headers" :key="header.id" :style="{ width: `${header.column.getSize()}px` }">
                        <FlexRender
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="table.getRowModel().rows.length > 0">
                    <tr
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                    >
                        <td
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="border px-4 py-2"
                        >
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </td>
                    </tr>
                </template>

                <tr v-else>
                    <td
                        :colspan="columns.length"
                        class="border px-4 py-2 text-center text-sm text-muted-foreground italic"
                    >
                        No Package Found...
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="8">
                        <div class="flex items-center justify-between mt-4">
                            <span class="text-sm text-muted-foreground">
                                Page {{ table.getState().pagination.pageIndex + 1 }}
                                of
                                {{ table.getPageCount() }}
                            </span>

                            <div class="flex gap-2">
                                <button
                                    class="border px-3 py-1 rounded"
                                    :disabled="!table.getCanPreviousPage()"
                                    @click="table.previousPage()"
                                >
                                    Previous
                                </button>

                                <button
                                    class="border px-3 py-1 rounded"
                                    :disabled="!table.getCanNextPage()"
                                    @click="table.nextPage()"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>    
    </div>
</template>